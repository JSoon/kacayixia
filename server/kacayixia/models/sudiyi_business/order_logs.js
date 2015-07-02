/**
 * lonso @ 15-6-2_Sun.
 * lonso@foxmail.com
 */
var Sequelize = require('sequelize');
var sudiyi_business = require('../../db/mysql.js').sudiyi_business;
var Model = require('../../db/Model.js');
var helper = require('../../utils/helper.js');
var Couriers = '';
var constSettings = require('../../const/const.js');
var FreeStoring = require('../user_center/free_storing_model.js');
var moment = require('moment');
var config = require('../../config/config.js');
var _ = require('lodash');
var ResendSms = require('../sudiyi_edms/edms_resend_sms.js');
var forEach = require('co-foreach');
var Orders = require('../user_center/orders_model.js');

setTimeout(function () {
	Couriers = require('../user_center/couriers_model.js');
}, 0);

//STATUS = {
//:canceled => -1,
//:reserved_unpaid => 0,
//:reserved_paid => 1,
//:delivered => 2,
//:code_checked => 3,
//:rx_to_rx => 4,
//:op_to_rx => 5,
//:op_to_cr => 6,
//:cr_to_cr => 7,
//:rx_to_rx_offline => 8,
//:op_to_op => 9,
//:op_to_propmgmt => 10,
//}

//{
//	-1 => '已取消',
//	0 => '未投递（箱格已预约，未付款）',
//	1 => '未投递（箱格已占用，已付款）',
//	2 => '已投递',
//	3 => '未取件（开箱码已验证）',
//	4 => '已取件（用户自取）',
//	5 => '已取件（值守取给用户）',
//	6 => '已取件（值守取给快递员）',
//	7 => '已取件（快递员取回）',
//	8 => '已取件（用户自取，离线）',
//	9 => '已取件（值守取给值守暂存）',
//	10 => '已取件（值守取给物业）',
//	11 => '系统关闭异常订单'
//}


var schema = {
	id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	device_id: Sequelize.INTEGER,
	box_order_id: Sequelize.INTEGER,
	box_type: Sequelize.INTEGER,
	reserve_period: Sequelize.INTEGER,
	user_id: Sequelize.STRING(15),
	send_tel: Sequelize.STRING(11),
	send_man: Sequelize.STRING(20),
	send_company: Sequelize.STRING(25),
	send_time: Sequelize.DATE,
	bar_code: Sequelize.STRING(40),
	client_tel: Sequelize.STRING(11),
	sdy_order_id: Sequelize.STRING(24),
	business_type: Sequelize.INTEGER,
	open_code: Sequelize.STRING(6),
	take_time: Sequelize.DATE,
	status: Sequelize.INTEGER,
	created_at: Sequelize.DATE,
	updated_at: Sequelize.DATE,
	lattice_id: Sequelize.INTEGER,
	lattice_name: Sequelize.STRING,
	rule_type: Sequelize.INTEGER,
	uuid: Sequelize.STRING(36),
	due_time: Sequelize.DATE,
	due_price_daily: Sequelize.INTEGER,
	location: Sequelize.STRING(40),
	sms_status: Sequelize.INTEGER(6),
	bar_code_raw: Sequelize.STRING(20),
	due_price_paid: Sequelize.INTEGER,
	delivery_type: Sequelize.INTEGER(6),
	consignee_pay: Sequelize.INTEGER,
	sender_retrieve_code: Sequelize.STRING(6)
};

//快件信息
var OrderLogs = Model(sudiyi_business, 'order_logs', schema, true);


var getCompanyOrdersCondition = OrderLogs.getCompanyOrdersCondition = function *(company_id) {
	var couriersInfo = yield Couriers.getWorkingAll(company_id);
	var _or = [];
	couriersInfo.forEach(function (couriersInfo) {
		if(couriersInfo.couriers){
			var _or_condition = {
				user_id: couriersInfo.couriers.users.id
			};
			if (couriersInfo.joined_at && !couriersInfo.left_at) {
				_or_condition.send_time = {$gte: helper.formatTimestamp(couriersInfo.joined_at)}
			}
			if (couriersInfo.joined_at && couriersInfo.left_at)
				_or_condition.send_time = {
					$between: [helper.formatTimestamp(couriersInfo.joined_at),
						helper.formatTimestamp(couriersInfo.left_at)]
				};
			_or.push(_or_condition);
		}
	});
	return _or;
};

/**
 * 将where条件成转发raw sql
 */
var sendTimeFilterCondition = function *(condition, now, start, end) {
	if (!_.isEmpty(condition))
		condition.where.$or = condition.where.$or || [];
	else
		condition = {where: {$or: []}};
	var value = '(';
	var key = [];
	var rawFilter = [];
	for (var i = 0; i < condition.where.$or.length; i++) {
		var _or = condition.where.$or[i];
		for (var j = 0; j < Object.keys(_or).length; j++) {
			var filterKey = Object.keys(_or)[j];
			if (typeof _or[Object.keys(_or)[j]] == 'string' || typeof _or[Object.keys(_or)[j]] == 'number') { //equal
				rawFilter.push(filterKey + '=' + _or[Object.keys(_or)[j]] + ' ')
			} else if (typeof _or[Object.keys(_or)[j]] == 'object') {
				var _sk = Object.keys(_or[Object.keys(_or)[j]])[0];
				var conditionKey = _sk.substring(1, _sk.length);
				if (typeof _or[Object.keys(_or)[j]][_sk] == 'object') { //between
					rawFilter.push(filterKey + ' ' + conditionKey + ' "' + _or[Object.keys(_or)[j]][_sk][0]
						+ '" and "' + _or[Object.keys(_or)[j]][_sk][1] + '" ')
				} else { //like
					rawFilter.push(filterKey + ' ' + conditionKey + ' "' + _or[Object.keys(_or)[j]][_sk] + '" ')
				}
			}

		}
	}

	value += rawFilter.join('or ');
	if (condition.where.$or.length)
		value += ' or status = ? or status = ? )';
	else
		value += ' status = ? or status = ? )';
	key.push(constSettings.EXPRESS.STATUS.DELIVERED);
	key.push(constSettings.EXPRESS.STATUS.CODECHECKED);
	if (start && end) {
		value += ' and timestampdiff(hour,send_time,?) between ? and ? ';
		key.push(now);
		key.push(start);
		key.push(end);
	} else if (start && !end) {
		value += ' and timestampdiff(hour,send_time,?) > ?';
		key.push(now);
		key.push(start)
	}

	return [value].concat(key)
};

/**
 * 根据时间删选，包括即将超期和超期两部分
 */
var getListBySendTime = function *(jwt, condition, listType, all) {
	var freeStoreInfo = (yield FreeStoring.find({where: {company_id: jwt.company_id}})) || {};
	var freeDate = freeStoreInfo.free_date || constSettings.EXPRESS.DATE.FREEDATE;
	var now = moment().add().format(constSettings.DATEFORMAT.EXPORT);
	if (listType === constSettings.EXPRESS.LIST.TYPE.WILLEXCEED) {
		condition.where = yield sendTimeFilterCondition(condition, now,
			freeDate * config.exceedRate,
			freeDate);
	} else if (listType === constSettings.EXPRESS.LIST.TYPE.EXCEED) {
		condition.where = yield sendTimeFilterCondition(condition, now,
			freeDate);
	}
	var orders = [];
	if (all)
		orders = yield OrderLogs.findAll(condition);
	else
		orders = yield OrderLogs.findAndCountAll(condition);

	orders = orders || {count: 0, rows: []};
	orders.exceedDate = now;

	var rows = [];
	(orders.rows || []).forEach(function(item){
		var _tmp = JSON.parse(JSON.stringify(item));
		_tmp.timeDiff = helper.countDown(helper.getTimeDiff(item.send_time, 's'));
		rows.push(_tmp)
	});
	orders.rows = rows;
	return orders;
};


var getWillEXCEEDListItem = function *(jwt, condition) {
	return yield getListBySendTime(jwt, condition, constSettings.EXPRESS.LIST.TYPE.WILLEXCEED);
};

var getEXCEEDListItem = function *(jwt, condition) {
	return yield getListBySendTime(jwt, condition, constSettings.EXPRESS.LIST.TYPE.EXCEED);
};


OrderLogs.getListItem = function *() {
	var body = this.query.data;
	var condition = OrderLogs.page(body);
	var jwt = yield helper.getJWT.call(this);
	condition.where['$or'] = yield getCompanyOrdersCondition(jwt.company_id);
	if (body.key &&( body.type == constSettings.EXPRESS.LIST.TYPE.WILLEXCEED || body.type == constSettings.EXPRESS.LIST.TYPE.EXCEED)) {
		var key = (body.key || '').toString();
		if (key.substr(0, 1) > 1 || key.length > 11) {
			condition.where['$or'].push({bar_code:{$like: key + '%'}});
		} else {
			condition.where['$or'].push({bar_code: {$like: key + '%'}});
			condition.where['$or'].push({client_tel: {$like: key + '%'}});
		}
	} else {
		if (body.key) {
			key = (body.key || '').toString();
			if (key.substr(0, 1) > 1 || key.length > 11) {
				condition.where['barcode'] = {$like: key + '%'};
			} else {
				condition.where['$or'] = [
					{barcode: {$like: key + '%'}},
					{old_mobile: {$like: key + '%'}}
				]
			}
		}
	}
	if (body.type == constSettings.EXPRESS.LIST.TYPE.WILLEXCEED) {
		return yield getWillEXCEEDListItem(jwt, condition)
	} else if (body.type == constSettings.EXPRESS.LIST.TYPE.EXCEED) {
		return yield getEXCEEDListItem(jwt, condition)
	} else if (body.type == constSettings.EXPRESS.LIST.TYPE.REPOST) {
		condition.where['company_id'] = jwt.company_id;
		return yield ResendSms.findAndCountAll(condition)
	} else {
		if (body.barcode)
			condition.where['bar_code'] = {$like: body.barcode + '%'};

		if (body.lattice)
			condition.where['lattice_name'] = {$like: body.lattice + '%'};

		if (body.clientTel)
			condition.where['client_tel'] = {$like: body.clientTel + '%'};

		if (body.sendTel)
			condition.where['send_tel'] = {$like: body.sendTel + '%'};

		if (body.start && !body.end)
			condition.where['send_time'] = {$gte: helper.getStartDate(body.start)};

		if (body.end && !body.start)
			condition.where['send_time'] = {$lte: helper.getEndDate(body.end)};

		if (body.end && body.start)
			condition.where['send_time'] = {between: [helper.getStartDate(body.start), helper.getEndDate(body.end)]};

		return yield OrderLogs.findAndCountAll(condition) || [];
	}
};

OrderLogs.getListBySendTime = getListBySendTime;

//查询快递员投件数量
OrderLogs.getOrderCount = function *(user_id, send_time) {
	condition = {where: {}};
	condition.where['user_id'] = user_id;
	condition.where['send_time'] = {$gte: (new Date(send_time * 1000))};
	return yield OrderLogs.count(condition)
};
module.exports = OrderLogs;



//通过投件网点的ID 查询在该网点获得的投件收入
OrderLogs.getTotalFeeByLatticeID = function *(order_log, courier_info, query_date){
		var order_ids = yield OrderLogs.findAll({
			where: {
				lattice_id: order_log.lattice_id,
				send_tel: courier_info.mobile,
				send_time: {
					$between: [helper.formatTimestamp(query_date.start), helper.formatTimestamp(query_date.end)]
				}
			},
			attributes: ['sdy_order_id']
		});

		var order_ids_arr = _.pluck(order_ids, 'sdy_order_id');

		var orders = yield Orders.find({
			where: {
				trade_id: {
					$in: order_ids_arr
				},
				pay_type: constSettings.ORDERS.PAIDTYPE.PERSONAL,
				order_type: constSettings.ORDERS.TYPE.BOOK,
				user_id: courier_info.id
			},
			attributes: [[Sequelize.fn('sum', Sequelize.col('total_fee')), 'total_fee']]
		});

		return orders
};

module.exports = OrderLogs;
