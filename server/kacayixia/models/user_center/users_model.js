/**
 * lonso @ 15-5-11_Sun.
 * lonso@foxmail.com
 */

var Sequelize = require('sequelize');
var user_center = require('../../db/mysql.js').user_center;
var Model = require('../../db/Model.js');
var helper = require('../../utils/helper.js');
var BOSSERROR = require('../../const/boss_error.js');
var constSettings = require('../../const/const.js');
var config = require('../../config/config.js');

var validation = function (item, options, fn) {
	if (!item.mobile || !item.password || !item.encrypt)
		return helper.throwError(BOSSERROR.e200001);
	else
		fn(null, item);
};


var schema = {
	id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	mobile: {type: Sequelize.STRING(20), allowNull: false},
	password: {type: Sequelize.STRING(40), allowNull: false},
	encrypt: {type: Sequelize.STRING(16), allowNull: false},
	user_type: {type: Sequelize.INTEGER(6), allowNull: false}, //0:普通用户 1:快递员
	balance: Sequelize.INTEGER,
	email: Sequelize.STRING(99),
	nickname: Sequelize.STRING(32),
	avatar: Sequelize.STRING(99),
	name: Sequelize.STRING(20),
	birthday: Sequelize.DATE,
	sex: Sequelize.INTEGER(6),
	idcard: Sequelize.STRING(6),
	idcard_front_image: Sequelize.STRING(255),
	client_os: Sequelize.STRING(20),
	client_uuid: Sequelize.STRING(99),
	vip: Sequelize.INTEGER(6),
	province: Sequelize.BIGINT(20),
	city: Sequelize.BIGINT(20),
	district: Sequelize.BIGINT(20),
	address: Sequelize.STRING(99),
	ticket: Sequelize.STRING(99),
	ticket_time: Sequelize.INTEGER,
	total_income: Sequelize.INTEGER,
	total_spend: Sequelize.INTEGER,
	verify: Sequelize.INTEGER(6), //0 - 未认证, 1 - 等待认证, 2 - 认证通过
	status: Sequelize.INTEGER(6), //0 - 已禁用，1 - 正常, 2 - 预注册用户, 3 - 老系统导入快递员, 4 - 快递分部管理系统添加"
	push_over_day: Sequelize.INTEGER(6),
	push_status: Sequelize.INTEGER(6)
};
var Users = Model(user_center, 'users', schema, validation);

/** 通过添加快递员创建用户,如果存在就更新用户
* @params Object user_info 用户信息
*@param Object jwt 用户token
**/
Users.createViaCourier = function *(user_info, jwt){
	var users = yield Users.findAll({
		where: {
			mobile: user_info.mobile
		}
	});

	var user = null;
	var update_attr = {
		name: user_info.name,
		user_type: constSettings.USER.USERTYPE.COURIER,
		province: jwt.user.province,
		city: jwt.user.city,
		district: jwt.user.district,
		address: jwt.user.address,
		idcard: user_info.idcard,
		verify: constSettings.COURIERS.VERIFY.PASS,
		status: constSettings.COURIERS.STATUS.ENABLE
	};

	if (users.length > 0){
		yield users[0].update(update_attr);
		user = users[0];
	}else{
		update_attr.encrypt = config.encrypt;
		update_attr.password = user_info.password;
		update_attr.balance = 0;
		update_attr.mobile = user_info.mobile;
		user = yield Users.create(update_attr);
	}

	return user;
};

/**
* 删除快递员，验证用户是否可以删除
* @params Int uid 用户ID
* @return Object user对象
**/
Users.deleteVerification = function *(uid){
	var users = yield Users.findAll({where: {id: uid}});
	if (users.length > 0){
		var user = users[0];
		if (user.status == constSettings.COURIERS.STATUS.DISABLE || user.verify != constSettings.COURIERS.VERIFY.PASS){
			yield helper.throwError({code: -1, message: '快递员状态异常，无法删除。', status: 400});
		}
	}
	return user;
};


Users.uniqueByMobile = function *(mobile) {
	var user = yield Users.find({where: {mobile: mobile}});
	if (user) return helper.throwError(BOSSERROR.e210014);
	else
		return '';
};



module.exports = Users;