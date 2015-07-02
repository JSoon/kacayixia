/**
 * lonso @ 15-5-11_Sun.
 * lonso@foxmail.com
 */
"use strict";
var Sequelize = require('sequelize');
var user_center = require('../../db/mysql.js').user_center;
var Model = require('../../db/Model.js');
var helper = require('../../utils/helper.js');
var BOSSERROR = require('../../const/boss_error.js');
var Areas = require('../../models/sudiyi_operation/areas_model.js');
var _ = require('lodash');
var Users = require('./users_model.js');
var forEach = require('co-foreach');
var constSettings = require('../../const/const.js');
var moment = require('moment');
var Company_Rel = require('../sudiyi_edms/company_rel_model.js');
var util = require('util');
var OrderLogs = require('../../models/sudiyi_business/order_logs.js');
var Couriers = {};
var CompanyOrders = {};

setTimeout(function () {
	Couriers = require('./couriers_model.js');
	CompanyOrders = require('./company_orders_model.js');
}, 0);


var validation = function (item, options, fn) {
	if (!item.name || !item.brand)
		return helper.throwError(BOSSERROR.e200001);
	else
		fn(null, item);
};

var schema = {
	id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	name: {type: Sequelize.STRING(40), allowNull: false},
	brand: {type: Sequelize.STRING(40), allowNull: false},
	address: Sequelize.STRING(99),
	phone_number: Sequelize.STRING(13),
	licence: Sequelize.STRING(99),
	licence_image: Sequelize.STRING(99),
	legal_entity: Sequelize.STRING(20),
	legal_entity_idcard: Sequelize.STRING(20),
	legal_entity_idcard_front_image: Sequelize.STRING(99),
	legal_entity_idcard_back_image: Sequelize.STRING(99),
	balance: Sequelize.INTEGER,
	province: Sequelize.BIGINT(20),
	city: Sequelize.BIGINT(20),
	district: Sequelize.BIGINT(20),
	created_by: Sequelize.INTEGER,
	verify: Sequelize.INTEGER,
	status: Sequelize.INTEGER,
	latitude: Sequelize.FLOAT,
	longitude: Sequelize.FLOAT,
	site_photo: Sequelize.STRING(100),
	brand_id: Sequelize.INTEGER,
	staff_name: Sequelize.STRING(20),
	staff_mobile: Sequelize.STRING(20),
	income: Sequelize.INTEGER,
	fee_rules_id: Sequelize.INTEGER
};

var Company = Model(user_center, 'courier_companies', schema, validation);
Company.belongsTo(Areas, {as: 'area', foreignKey: {name: 'city', type: Sequelize.INTEGER}});
Company.belongsTo(Users, {as: 'users', foreignKey: {name: 'created_by', type: Sequelize.INTEGER}});


var getListCondition = function * (ctx) {
	var body = this.query.data;
	var verify = body.verify;
	var name = body.name;
	var city = body.city;
	var condition = Company.page(body);
	condition.include = [
		{
			model: Users, as: 'users',
			attributes: ['name']
		}
	];

	if (verify || verify === 0)
		condition.where.verify = verify;

	if (name) {
		if (parseInt(name) == name)
			condition.where['phone_number'] = {$like: name + '%'};
		else
			condition.where['name'] = {$like: name + '%'};
	}

	if (city) {
		var area = yield Areas.find({where: {name: {$like: city + '%'}}});
		area.id && (condition.where.city = area.id);
	}
	return condition;
};


Company.getListItem = function *() {
	var condition = yield getListCondition.call(this);
	var companies = yield Company.findAndCountAll(condition) || [];
	var rows = [];
	yield forEach(companies.rows, function *(company) {
		company.city = (yield Areas.find(company.city) || {}).name || '';
		rows.push(company)
	});
	companies.rows = rows;
	return companies;
};


Company.exportItem = function *() {
	var condition = {
		where: {
			status: constSettings.COMPANY.STATUS.PASS,
			verify: constSettings.COMPANY.VERIFY.PASS
		},
		include: [
			{
				model: Users, as: 'users',
				attributes: ['name']
			}
		]
	};

	var companies = yield Company.findAll(condition) || [];
	var rows = [];
	yield forEach(companies, function *(company) {
		if (company.city) {
			var cityName = (yield Areas.find(company.city) || {}).name || '';
			rows.push([
				company.id,
				company.name,
				company.phone_number,
				company.brand,
				cityName,
				(company.balance || 0) / 100,
				((company.users) || {}).name || '佚名',
				moment.unix(company.created_at).format(constSettings.DATEFORMAT.EXPORT)
			])
		}
	});
	return rows;
};


Company.getIdsByCityName = function *(cityName) {
	var areas = yield Areas.findAll({where: {name: {$like: cityName + '%'}}});
	var cityIds = _.pluck(areas, 'id');
	return _.pluck(yield Company.findAll({where: {city: cityIds}}), 'id');
};

Company.createInSub = function *() {
	var body = this.request.body.data;
	var company_id = this.params.id;
	var jwt = yield helper.getJWT.call(this);
	if (!helper.checkCellPhone(body.mobile)) return helper.throwError(BOSSERROR.e210010);
	var admin = yield Couriers.find({
		where: {role: constSettings.COURIERS.ROLE.ADMIN},
		include: [{
			model: Users, as: 'users',
			where: {
				mobile: body.mobile,
				password: yield helper.password(body.password)
			}
		}]
	});

	if (!admin) return helper.throwError(BOSSERROR.e210021);
	var companyRel = yield Company_Rel.find({where: {company_id: admin.company_id}});
	if (companyRel && companyRel.parent_id)  return helper.throwError(BOSSERROR.e210022);

	if (!companyRel)
		return yield Company_Rel.create({
			company_id: admin.company_id,
			parent_id: jwt.company_id
		});
	else
		return yield companyRel.updateAttributes({parent_id: jwt.company_id})
};

//通过手机号验证分部是否被添加
Company.checkAdmin = function *() {
	var body = this.query.data;
	if (!helper.checkCellPhone(body.mobile)) return helper.throwError(BOSSERROR.e210010);
	var admin = yield require('./couriers_model.js').find({
		where: {role: constSettings.COURIERS.ROLE.ADMIN},
		include: [{
			model: Users, as: 'users',
			where: {
				mobile: body.mobile
			}
		}]
	});
	if (!admin) return helper.throwError(BOSSERROR.e210023);

	var companyRel = yield Company_Rel.find({where: {company_id: admin.company_id}});
	if (companyRel && companyRel.parent_id)  return helper.throwError(BOSSERROR.e210022);
	return '';
};

Company.transfer = function *() {
	var body = this.request.body.data;
	var total_fee = body.total_fee;
	var jwt = yield helper.getJWT.call(this);
	var remark = body.remark || '无';
	var pay_company_id = body.pay_company_id;
	var receive_company_id = body.receive_company_id;
	if (!pay_company_id || !receive_company_id || receive_company_id == pay_company_id)
		return helper.throwError(BOSSERROR.e210027);
	if (parseInt(total_fee) != total_fee) return helper.throwError(BOSSERROR.e210023);
	var pay_company = yield Company.find(pay_company_id);
	var receive_company = yield Company.find(receive_company_id);
	if (!pay_company || !receive_company) return helper.throwError(BOSSERROR.e210024);
	var pay_company_rel = yield Company_Rel.find({where: {company_id: pay_company_id}});
	var receive_company_rel = yield Company_Rel.find({where: {company_id: receive_company_id}});
	if (!receive_company_rel || !receive_company_rel || pay_company_rel.parent_id != jwt.company_id
		|| receive_company_rel.parent_id != jwt.company_id)
		return helper.throwError(BOSSERROR.e210025);
	pay_company.balance -= total_fee;
	receive_company.balance += total_fee;
	if (pay_company.balance < 0) {
		BOSSERROR.e210026.message = util.format(BOSSERROR.e210026.message, pay_company.balance += total_fee);
		return helper.throwError(BOSSERROR.e210026);
	}
	var pay_remark = util.format(constSettings.REMARK.COMPANYORDER.PAY,
		pay_company.name, receive_company.name, total_fee / 100, pay_company.balance / 100, remark, jwt.company_name);
	var receive_remark = util.format(constSettings.REMARK.COMPANYORDER.RECEIVE,
		receive_company.name, pay_company.name, total_fee / 100, receive_company.balance / 100, remark, jwt.company_name);
	var t = yield user_center.transaction();
	try {
		yield pay_company.save({transaction: t});
		yield receive_company.save({transaction: t});
		yield CompanyOrders.create({
			company_id: pay_company_id,
			order_type: constSettings.COMPANYORDERS.TYPE.TRANS,
			pay_type: constSettings.COMPANYORDERS.PAIDTYPE.PERSONAL,
			total_fee: total_fee,
			status: constSettings.COMPANYORDERS.STATUS.PAID,
			remarks: pay_remark
		}, {transaction: t});
		yield CompanyOrders.create({
			company_id: receive_company_id,
			order_type: constSettings.COMPANYORDERS.TYPE.INCOME,
			pay_type: constSettings.COMPANYORDERS.PAIDTYPE.PERSONAL,
			total_fee: total_fee,
			status: constSettings.COMPANYORDERS.STATUS.PAID,
			remarks: receive_remark
		}, {transaction: t});
		t.commit();
	} catch (e) {
		Company.logger(e);
		t.rollback();
	}
	return '';
};

Company.getSubInfo = function *() {
	var jwt = yield helper.getJWT.call(this);
	var company_ids = _.pluck(yield Company_Rel.findAll({where: {parent_id: jwt.company_id}}), 'company_id')
	var companyInfos = [];
	yield forEach(company_ids, function *(company_id) {
		var condition = {
			where: {
				$or: yield OrderLogs.getCompanyOrdersCondition(company_id)
			}
		};

		var company = yield Company.find({where: {id: company_id}});
		var manger = yield Couriers.getManager(company_id);
		var couriers = (yield Couriers.findCouriers(company_id)) || [];
		var count = yield OrderLogs.count(condition);
		var user_balance = 0;
		yield forEach(couriers, function (courier) {
			user_balance += courier.users.balance || 0;
		});

		if (manger) {
			var companyInfo = {
				name: company.name,
				manger: manger.users.name,
				mobile: manger.users.mobile,
				courier_count: couriers.length,
				count: count,
				balance: company.balance,
				user_balance: user_balance
			};
		}
		companyInfos.push(companyInfo);
	});

	return companyInfos;
};


Company.changePassword = function *() {
	var body = this.request.body.data;
	if (!body.newPwd || !body.repeatNewPwd
		|| body.newPwd.length < 6 || body.newPwd.length > 18
		|| body.repeatNewPwd.length < 6 || body.repeatNewPwd.length > 18
		|| body.newPwd != body.repeatNewPwd)
		return helper.throwError(BOSSERROR.e210017);

	var jwt = yield helper.getJWT.call(this);
	var manager = yield Couriers.getManager(jwt.company_id, body.password);
	if (!manager)  return helper.throwError(BOSSERROR.e210029);


	var user = yield Users.find({where: {id: manager.user_id}});
	user.password = yield helper.password(body.newPwd);
	return yield user.save();


};


module.exports = Company;