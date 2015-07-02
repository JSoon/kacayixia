/**
 * lonso @ 15-5-14_Sun.
 * lonso@foxmail.com
 */
"use strict";
var Sequelize = require('sequelize');
var user_center = require('../../db/mysql.js').user_center;
var Model = require('../../db/Model.js');
var BOSSERROR = require('../../const/boss_error.js');
var Company = require('./company_model.js');
var CompanyOrders = require('./company_orders_model.js');
var constSettings = require('../../const/const.js');
var Users = require('./users_model.js');
var util = require('util');
var helper = require('../../utils/helper.js');
var Areas = require('../sudiyi_operation/areas_model.js');

var validation = function (item, options, fn) {
	if (!item.company_id || !item.total_fee
		|| !item.account || !item.bank || !item.name
		|| !item.op_id || !item.op_name || !item.op_mobile)
		return helper.throwError(BOSSERROR.e200001);
	else
		fn(null, item);
};
/**
 * 提现数据表
 */
var schema = {
	id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	company_id: {type: Sequelize.INTEGER, allowNull: false},
	total_fee: {type: Sequelize.INTEGER, allowNull: false},
	account: {type: Sequelize.STRING(30), allowNull: false},
	bank: {type: Sequelize.STRING(50), allowNull: false},
	name: {type: Sequelize.STRING(20), allowNull: false},
	fee_add_up: {type: Sequelize.INTEGER}, //累计收入，
	fee_go_off: {type: Sequelize.INTEGER}, //已体现金额,
	balance: {type: Sequelize.INTEGER}, //账户余额,
	city_id: {type: Sequelize.INTEGER},//城市id
	city: {type: Sequelize.STRING(30)},//城市名字
	company_name: {type: Sequelize.STRING(100)},//分部名称
	status: Sequelize.INTEGER, //0:提现失败,1:提现成功,3:提现申请中,4:用户取消
	remark: Sequelize.STRING,
	op_id: {type: Sequelize.INTEGER, allowNull: false}, //申请人id
	op_name: {type: Sequelize.STRING(20), allowNull: false},//申请人姓名,
	op_mobile: {type: Sequelize.STRING(20), allowNull: false},//申请人电话,
	staff_id: Sequelize.STRING(20),//操作人姓名
	staff_name: Sequelize.STRING(20)//操作人姓名
};
var Withdrawals = Model(user_center, 'withdrawals', schema, validation);
Withdrawals.belongsTo(Company, {as: 'company', foreignKey: {name: 'company_id', type: Sequelize.INTEGER}});

Withdrawals.createOrder = function *(data) {
	var waitOrders = yield Withdrawals.findAll({where: {company_id: data.company_id,
		status: constSettings.WITHDRAWALS.STATUS.WAIT}});

	if (waitOrders.length)
		return helper.throwError(BOSSERROR.e210006);
	var company = yield Company.find(data.company_id);
	var fee_go_off = (yield Withdrawals.sum('total_fee',
		{where: {company_id: data.company_id,
			status: constSettings.WITHDRAWALS.STATUS.SUCCESS
		}})) || 0;
	var fee_add_up = +fee_go_off + +company.income;


	if (company.income - data.total_fee < 0)
		return helper.throwError(BOSSERROR.e210003);
	company.income -= data.total_fee;
	var balance = company.income;

	//todo 从token获取
	var operator = yield Users.find(1);
	var remarks = util.format(constSettings.REMARK.WITHDRAWALS[constSettings.WITHDRAWALS.STATUS.WAIT],
		operator.name, operator.mobile, data.account, data.total_fee / 100, company.income / 100);

	var city = yield Areas.find(company.city);
	var t = yield  user_center.transaction();
	try {
		yield [
			company.save({transaction: t}),
			CompanyOrders.create({
				company_id: company.id,
				order_type: constSettings.COMPANYORDERS.TYPE.WITHDRAWALS,
				pay_type: constSettings.COMPANYORDERS.PAIDTYPE.PERSONAL,
				total_fee: data.total_fee,
				status: constSettings.COMPANYORDERS.STATUS.PAID,
				remarks: remarks
			}, {transaction: t}),
			Withdrawals.create({
				company_id: company.id,
				total_fee: data.total_fee,
				account: data.account,
				bank: data.bank,
				name: data.name,
				status: constSettings.WITHDRAWALS.STATUS.WAIT,
				op_id: operator.id,
				op_name: operator.name,
				op_mobile: operator.mobile,
				fee_go_off: fee_go_off,
				fee_add_up: fee_add_up,
				balance: balance,
				city_id: company.city,
				company_name: company.name,
				city: city.name
			}, {transaction: t})
		];
		t.commit();
	} catch (e) {
		Withdrawals.logger('createOrder', e);
		t.rollback('');
	}
	return {};
};


Withdrawals.refunds = function *(item, data) {
	var company = yield Company.find(item.company_id);
	company.income += +item.total_fee;
	item.status = data.status;
	item.remark = data.remark || '';

	//todo 从token获取
	var operator = yield Users.find(1);
	var remarks = util.format(constSettings.REMARK.WITHDRAWALS[data.status],
		operator.name, operator.mobile, item.id, item.total_fee / 100, company.income / 100, item.remark);

	var t = yield  user_center.transaction();
	try {
		yield [
			company.save({transaction: t}),
			item.save({transaction: t}),
			CompanyOrders.create({
				company_id: company.id,
				order_type: constSettings.COMPANYORDERS.TYPE.WREFUNDS,
				pay_type: constSettings.COMPANYORDERS.PAIDTYPE.PERSONAL,
				total_fee: item.total_fee,
				status: constSettings.COMPANYORDERS.STATUS.PAID,
				remarks: remarks
			}, {transaction: t})
		];
		t.commit();
	} catch (e) {
		Withdrawals.logger('createOrder', e);
		t.rollback('');
	}
	return {};
};


module.exports = Withdrawals;