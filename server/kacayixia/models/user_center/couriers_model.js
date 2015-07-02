/**
 * lonso @ 15-5-11_Sun.
 * lonso@foxmail.com
 */
"use strict";

var Sequelize = require('sequelize');
var Company = require('../user_center/company_model.js');
var user_center = require('../../db/mysql.js').user_center;
var Model = require('../../db/Model.js');
var helper = require('../../utils/helper.js');
var BOSSERROR = require('../../const/boss_error.js');
var Users = require('./users_model.js');
var constSettings = require('../../const/const.js');
var CourierCompanyRel = require('../user_center/courier_company_rel_model.js');
var Areas = require('../../models/sudiyi_operation/areas_model.js');
var _ = require('lodash');
var config = require('../../config/config.js');
var Brand = require('../../models/user_center/brand_model.js');
var OrderLogs = require('../../models/sudiyi_business/order_logs.js');
var forEach = require('co-foreach');

var validation = function (item, options, fn) {
	if (!item.user_id)
		return helper.throwError(BOSSERROR.e200001);
	else
		fn(null, item);
};

var schema = {
	id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	card_num: Sequelize.STRING(20),
	brand: Sequelize.STRING(20),
	company_id: Sequelize.INTEGER,
	company_name: Sequelize.STRING(100),
	role: Sequelize.INTEGER,
	city: Sequelize.BIGINT(20),
	score: Sequelize.INTEGER,
	use_balance: Sequelize.INTEGER,
	worker_card_image: Sequelize.STRING(255),
	lattice_ids: Sequelize.STRING(255),
	agreement_file: Sequelize.STRING(99),
	verify: Sequelize.INTEGER(6),
	status: Sequelize.INTEGER(6), //0:禁用 1:可用
	post_code: Sequelize.STRING(6),
	staff_name: Sequelize.STRING(20),
	staff_mobile: Sequelize.STRING(20),
	fee_rules_id: Sequelize.INTEGER
};


var Couriers = Model(user_center, 'couriers', schema, validation);
Couriers.belongsTo(Users, {as: 'users', foreignKey: {name: 'user_id', type: Sequelize.INTEGER}});
CourierCompanyRel.belongsTo(Couriers, {as: 'couriers', foreignKey: {name: 'user_id', type: Sequelize.INTEGER}});

//根据条件查询快递员信息
Couriers.getCouriersInfo = function *() {
	var body = this.query.data;
	var is_left = body.is_left;
	var name = body.name;
	var per_page = body.per_page || 20;
	var condition = Couriers.page(body, per_page);
	var jwt = yield helper.getJWT.call(this);
	var courier_condition = {};
	var condition = Couriers.page(body);

	if (is_left == 1) {
		condition.where["left_at"] = null;
		courier_condition = {
			verify: constSettings.COURIERS.VERIFY.PASS,
			status: constSettings.COURIERS.STATUS.ENABLE
		};
		condition.order = [["joined_at", "desc"]];
	} else if (is_left == 0) {
		condition.where["left_at"] = {$ne: null};
		condition.order = [["left_at", "desc"]];
	}
	;

	condition.include = [
		{
			model: Couriers, as: 'couriers',
			attributes: ["card_num", "role"],
			required: true,
			where: courier_condition,
			include: [
				{model: Users, as: 'users', attributes: ['mobile', 'name', 'idcard', 'balance'], required: true}
			]
		}
	];

	condition.where["company_id"] = jwt.company_id;
	if (name) {
		if (yield helper.checkZhCN(name)) {
			condition.include[0].include[0].where = {
				name: {
					$like: name + '%'
				}
			}
		} else {
			condition.include[0].include[0].where = {
				mobile: {
					$like: name + '%'
				}
			}

		}
	}

	return yield CourierCompanyRel.findAndCountAll(condition);
};


Couriers.getWorkingAll = function *(company_id) {
	var condition = {
		include: [
			{
				model: Couriers, as: 'couriers', attributes: ['id'], include: [
				{model: Users, as: 'users', attributes: ['id']}
			]
			}
		],
		where: {
			company_id: company_id
		}
	};
	return yield CourierCompanyRel.findAll(condition)
};

/**判断一个快递员是否属于其他公司
 * @params String mobile 用户手机号
 * @params Object jwt 用户token
 **/
Couriers.isBelongToCompany = function *(mobile, jwt) {
	var condition = {where: {}};
	condition.where["left_at"] = null;
	var status = false;
	condition.include = [
		{
			model: Couriers, as: 'couriers',
			attributes: ["company_id"],
			required: true,
			include: [
				{model: Users, as: 'users', required: true, attributes: ["id"], where: {mobile: mobile}}
			]
		}
	];

	var result = yield CourierCompanyRel.findAll(condition);

	if (result.length > 0 && result[0].company_id != jwt.company_id) {
		status = true;
	}

	return status;
};


/** 通过添加快递员创建快递员,如果存在就更新快递员
 * @params Object user 用户信息
 *@param Object jwt 用户token
 **/
Couriers.createViaCourier = function *(user, jwt) {
	var couriers = yield Couriers.findAll({
		where: {
			user_id: user.id
		}
	});

	var courier = null;

	var update_attr = {
		brand: jwt.brand,
		company_id: jwt.company_id,
		company_name: jwt.company_name,
		city: jwt.user.city,
		verify: constSettings.COURIERS.VERIFY.PASS,
		status: constSettings.COURIERS.STATUS.ENABLE
	};
	if (couriers.length > 0) {
		if (couriers[0].role == constSettings.COURIERS.ROLE.ADMIN) {
			return helper.throwError(BOSSERROR.e200012);
		}

		if (user.balance == 0) {
			update_attr.card_num = '';
		}

		yield couriers[0].update(update_attr);
		courier = couriers[0];
	} else {
		update_attr.user_id = user.id;
		update_attr.role = constSettings.COURIERS.ROLE.STAFF;
		update_attr.card_num = '';
		update_attr.user_balance = 0;

		courier = yield Couriers.create(update_attr);
	}

	return courier;
};

/**
 *删除快递员，验证快递员是否可以删除
 *@params Int uid user的ID
 *@params Object jwt 用户token
 *@return Object courier对象
 **/
Couriers.deleteVerification = function *(uid, jwt) {
	var couriers = yield Couriers.findAll({where: {user_id: uid}});
	if (couriers.length > 0) {
		var courier = couriers[0];
		//如果快递员为管理员角色则终止操作
		if (courier.role == constSettings.COURIERS.ROLE.ADMIN) {
			yield helper.throwError({code: -1, message: '不能删除管理员。', status: 400});
		}

		//验证要删除的快递员是否属于该公司，不能删除其他公司的快递员
		if (courier.company_id != jwt.company_id) {
			yield helper.throwError({code: -1, message: '快递员不属于该公司。', status: 400});
		}

	}
	return courier;
};

/**
 * 分部注册
 * @returns {*}
 */
Couriers.managerRegister = function *() {
	var body = this.request.body.data;
	var company = '';
	if (!helper.checkCellPhone(body.mobile) || !helper.checkPhone(body.phone_number))
		return helper.throwError(BOSSERROR.e210010);
	yield Users.uniqueByMobile(body.mobile);
	if (!helper.checktIdCard(body.idcard)) return helper.throwError(BOSSERROR.e210015);
	if (!body.idcard_front_image || !body.idcard_back_image)return helper.throwError(BOSSERROR.e210016);
	if (!body.password || body.password.length < 6 || body.password.length > 18 || body.password != body.repeatPassword)
		return helper.throwError(BOSSERROR.e210017);
	var brand = yield Brand.find(body.brand_id);
	if (!brand) return helper.throwError(BOSSERROR.e210019);
	if (body.company_id >= 0) {
		company = yield Company.find(body.company_id);
		if (!company) return helper.throwError(BOSSERROR.e210020);
		if (yield Couriers.find({where: {company_id: body.company_id, role: constSettings.COURIERS.ROLE.ADMIN}}))
			return helper.throwError(BOSSERROR.e210018);
	}

	var t = yield user_center.transaction();
	try {
		var _user = {
			mobile: body.mobile,
			password: yield helper.md5(body.password + config.encrypt),
			encrypt: config.encrypt,
			idcard: body.idcard,
			idcard_front_image: body.idcard_front_image,
			idcard_back_image: body.idcard_back_image,
			verify: constSettings.USER.VERIFY.WAIT,
			status: constSettings.USER.STATUS.EDMS,
			user_type: constSettings.USER.USERTYPE.COURIER,
			balance: 0
		};
		var user = yield Users.create(_user, {transaction: t});
		if (!company) {
			var _company = {
				name: body.company_name,
				brand: brand.name,
				address: body.address,
				phone_number: body.phone_number,
				licence_image: body.licence_image,
				balance: 0,
				city: body.city,
				latitude: body.latitude,
				longitude: body.longitude,
				brand_id: brand.id,
				verify: constSettings.COMPANY.VERIFY.WAIT,
				status: constSettings.COMPANY.STATUS.DISABLE
			};
			company = yield Company.create(_company, {transaction: t})
		}
		var _courier = {
			user_id: user.id,
			brand: brand.name,
			company_id: company.id,
			company_name: company.name,
			role: constSettings.COURIERS.ROLE.ADMIN,
			city: body.city,
			verify: constSettings.COURIERS.VERIFY.WAIT,
			status: constSettings.COURIERS.STATUS.DISABLE,
			origin: constSettings.ORIGIN.EDMS,
			discount: 0,
			income: 0
		};

		yield Couriers.create(_courier, {transaction: t});

		t.commit();
	} catch (e) {

		Couriers.logger(e);
		t.rollback();
		return e;
	}
	return '';
};

/**
 *獲取快遞公司管理員
 * @param company_id
 * @returns {*}
 */
Couriers.getManager = function*(company_id, password) {
	var where = {};
	if (password)
		where.password = yield helper.password(password);

	return yield Couriers.find({
		where: {
			role: constSettings.COURIERS.ROLE.ADMIN,
			company_id: company_id,
			verify: constSettings.COURIERS.VERIFY.PASS,
			status: constSettings.COURIERS.STATUS.ENABLE
		},
		include: {
			model: Users,
			as: 'users',
			where: where
		}
	});
};


Couriers.findCouriers = function *(company_id) {
	return yield Couriers.findAll({
		where: {
			role: constSettings.COURIERS.ROLE.STAFF,
			company_id: company_id,
			verify: constSettings.COURIERS.VERIFY.PASS,
			status: constSettings.COURIERS.STATUS.ENABLE
		},
		include: {
			model: Users,
			as: 'users'
		}
	});
};

/**
* 获取快递员详情
* @param Int id 用户user表ID
* @param Object jwt 用户token
* @param String start 开始时间
* @param String end 结束时间
**/
Couriers.getCourierInfo = function *(id, jwt, start, end){
	var courier_info = yield Users.find({where: {id: id}, attributes: ['id','name','mobile','balance','idcard']});
	var condition = {}
	condition.include = [
		{
			model: Couriers, as: 'couriers',
			required: true,
			where: {user_id: id, company_id: jwt.company_id}
		}
	];

	condition.order = [["joined_at", "desc"]];

	var courier_company_rel_info = yield CourierCompanyRel.findAll(condition);

	if (start) {
		start = helper.getStartDate(start);
	}else{
		start = helper.getInfinitesimalDate();
	}


	if (end) {
		end = helper.getEndDate(end);
	}else{
		end = helper.getInfinityDate();
	}

	var query_dates = yield Couriers.getQueryDate(courier_company_rel_info, start, end);

	var lattice_infos = [];
	var merge_lattice_infos = {};

	yield forEach(query_dates, function *(query_date) {
		var order_logs = yield OrderLogs.findAll({
			where: {
				send_tel: courier_info.mobile,
				send_time: {
					$between: [helper.formatTimestamp(query_date.start), helper.formatTimestamp(query_date.end)]
				}
			},
			attributes: ['lattice_name', 'lattice_id', [Sequelize.fn('count', Sequelize.col('lattice_id')),'count']],
			group: ['lattice_id']
		});

		yield forEach(order_logs, function *(order_log){
			var res = yield OrderLogs.getTotalFeeByLatticeID(order_log, courier_info, query_date);
			var total_fee = (res.total_fee || 0);
			lattice_infos.push({
				lattice_name: order_log.lattice_name,
				lattice_id: order_log.lattice_id,
				count: order_log.dataValues.count,
				total_fee: total_fee
			});
		});

	});

	yield forEach(lattice_infos, function *(lattice_info){
		if(merge_lattice_infos[lattice_info.lattice_id]){
			merge_lattice_infos[lattice_info.lattice_id].count = merge_lattice_infos[lattice_info.lattice_id].count + lattice_info.count;
			merge_lattice_infos[lattice_info.lattice_id].total_fee = merge_lattice_infos[lattice_info.lattice_id].total_fee + lattice_info.total_fee;
		}else{
			merge_lattice_infos[lattice_info.lattice_id] = lattice_info
		}
	});


	return {order_infos: merge_lattice_infos, courier_info: courier_info}
};

/**
*获取查询时间和快递员的在特定公司的时间之间的交集
*@param Object courier_company_rel_info 快递员和快递公司关系
*@param Int start 查询开始时间
*@param Int end 查询结束时间
**/
Couriers.getQueryDate = function *(courier_company_rel_info, start, end){
	var res = [];
	var start = +helper.getDateToTimestamp(start);
	var end = +helper.getDateToTimestamp(end);

	yield forEach(courier_company_rel_info, function *(ccl) {
		var area = {};

		if (!(start > ccl.left_at || end < ccl.joined_at)){
			if (start < ccl.joined_at){
				area.start = ccl.joined_at;
			}else{
				area.start = start;
			}
			if (ccl.left_at){
				if (end > ccl.left_at){
					area.end = ccl.left_at;
				}else{
					area.end = end;
				}
			}else{
				area.end = end;
			}

			res.push(area);
		}
	});

	return res;
};


module.exports = Couriers;

