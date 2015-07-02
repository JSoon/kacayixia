"use strict";
var Couriers = require('../../models/user_center/couriers_model.js');
var Users = require('../../models/user_center/users_model.js');
var Company = require('../../models/user_center/company_model.js');
var CompanyOrders = require('../../models/user_center/company_orders_model.js');
var Orders = require('../../models/user_center/orders_model.js');
var DeliveryCards = require('../../models/user_center/delivery_cards_model.js')
var CourierCompanyRel = require("../../models/user_center/courier_company_rel_model.js");
var OrderLogs = require('../../models/sudiyi_business/order_logs.js');
var response = require('../../utils/response.js');
var forEach = require('co-foreach');
var sms = require('../../utils/sms.js');
var helper = require('../../utils/helper.js');
var constSettings = require('../../const/const.js');
var BOSSERROR = require('../../const/boss_error.js');
var config = require('../../config/config.js');

/**
*	快递员列表页展示
*	@param Int is_left 1为在职快递员，0为离职快递员
*	@return String 列表相关信息
**/
exports.list = function *(){
	var couriers = yield Couriers.getCouriersInfo.call(this) || {};
	var rows = [];
	yield forEach((couriers.rows || []), function *(courier) {
		var item = JSON.parse(JSON.stringify(courier));
		item.order_count = yield OrderLogs.getOrderCount(courier.user_id, courier.joined_at);
		rows.push(item);
	});
	couriers.rows = rows;
	yield  response.call(this, couriers);
};

exports.create = function *(){
	var body = this.request.body.data;
	var name = body.name;
	var mobile = body.mobile;
	var idcard = body.idcard;
	var password = (yield helper.md5(mobile.substring(5) + config.encrypt)).toLowerCase();
	var jwt = yield helper.getJWT.call(this);
	var user = null;
	var courier = null;
	var ccl = null;
	var res = "注册失败!";

	var is_vaildate_mobile = helper.checkCellPhone(mobile);

	if (!is_vaildate_mobile){
		return yield helper.throwError(BOSSERROR.e210010);
	}

	//判断如果已经是其他公司在职快递员、管理员则终止操作
	var  is_belong_to_company = yield Couriers.isBelongToCompany(mobile, jwt);
	if (is_belong_to_company){
		return yield helper.throwError(BOSSERROR.e210011);
	}

	//用户存在，修改users表姓名name，并激活状态（防止以前被禁用过），否则创建个user
	user = yield Users.createViaCourier({mobile: mobile, name: name, idcard: idcard, password: password}, jwt);

	/**
	/*查询以前是否注册过快递员（user_id唯一不重复）
	/*若存在修改couriers表公司ID、公司名称，并激活状态（防止以前被禁用过），清空卡号
	/*否则创建快递员
	**/
	courier = yield Couriers.createViaCourier(user, jwt);

	//处理快递员与快递公司的关系
	ccl = yield CourierCompanyRel.addAndUpdateCourier(courier,jwt);

	if (ccl)
		res = "注册成功！"

	yield response.call(this, res);
};

exports.delete = function *(){
	var uid = this.params.id;
	var jwt = yield helper.getJWT.call(this);
	var money = 0, company_last_balance = 0, company_id = null;

	//查询user，如果快递员已被删除则返回错误信息
	var user = yield Users.deleteVerification(uid);

	//查询courier，验证快递员是否符合删除条件
	var courier = yield Couriers.deleteVerification(uid, jwt);

	//修改courier_company_rel，加入离职时间
	yield CourierCompanyRel.updateLeftAt(courier);

	//退还余额给公司，TODO 拆分出去新逻辑
	var companies = yield Company.findAll({where: {id: courier.company_id}});

	if (companies.length > 0){
		var company = companies[0];
		money = user.balance;
		company_last_balance = company.balance;
		yield company.update({balance: (user.balance + company.balance) });
	}

	//清空快递员账号余额
	yield user.update({
		ticket: '',
		ticket_time: helper.getTimestamp(),
		balance: 0,
		status: constSettings.USER.STATUS.PRE_VERIFY
	});

	//禁用courier，解绑投递卡，清空派件码
	company_id = courier.company_id;
	yield courier.update({
		status: 0,   //0 - 已禁用
		card_num: '',
		post_code: '',
	});

	//修改关联表delivery_cards
	yield DeliveryCards.updateFromDelCourier(user);

	//记录公司账户收入明细
	var order_type = money >= 0 ? constSettings.COMPANYORDERS.TYPE.INCOME : constSettings.COMPANYORDERS.TYPE.TRANS;
	yield CompanyOrders.create({
			company_id: company_id,
			order_type: order_type,
			pay_type: constSettings.COMPANYORDERS.PAIDTYPE.PERSONAL,
			trade_id: helper.getTimestamp(),
			total_fee: money,
			last_balance: company_last_balance,
			order_info_id: 0,
			status: constSettings.COMPANYORDERS.STATUS.PAID,
			op_id: jwt.user.id,
			op_name: jwt.user.name,
			qrcode: '',
			remarks: '【删除快递员:' + user.name + '，退回公司余额:' + (money / 100) + '元，操作人：' + jwt.user.name + '】'
	});

	//记录快递员支出明细
	yield Orders.create({
			user_id: user.id,
			order_type: constSettings.ORDERS.TYPE.COMPANY,
			trade_id: helper.getTimestamp(),
			pay_type: constSettings.ORDERS.PAIDTYPE.PERSONAL,
			total_fee: money,
			last_balance: money,
			order_info_id: 0,
			status: constSettings.ORDERS.STATUS.PAID,
			remarks: '【删除快递员:' + user.name + '，退回公司余额:' + (money / 100) + '元，操作人：' + jwt.user.name + '】'
	});

	//发短信
	var content = '您已从' + courier.brand + courier.company_name + '离职，退回公司余额:' + (money / 100) + '元，如有疑问，请联系您的公司管理员。';
	yield sms.send(user.mobile, content);

	yield response.call(this, "删除成功！");
};


exports.read = function *(){
	var uid = this.params.id;
	var body = this.query.data;
	var start = body.start || '';
	var end = body.end || '';
	var jwt = yield helper.getJWT.call(this);

	if (!uid){
		return yield helper.throwError(BOSSERROR.e200001);
	}

	yield response.call(this, yield Couriers.getCourierInfo(uid, jwt, start, end));
};