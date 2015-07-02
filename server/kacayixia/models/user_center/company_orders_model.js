/**
 * lonso @ 15-5-11_Sun.
 * lonso@foxmail.com
 */
var Sequelize = require('sequelize');
var user_center = require('../../db/mysql.js').user_center;
var Model = require('../../db/Model.js');
var Company = require('./company_model.js');

/**
 * order_type: "订单类型，1: 充值, 2: 金额转出, 3: 金额转入, 4: 退款, 5: 系统同步余额 6. 快递分部管理系统  7: 管理员修改金额, 8:提现"
 * pay_type: "支付类型，1: 余额, 2: 支付宝, 3: 微信, 4: 预留, 5: 微信公众号"
 * status:"0: 未支付, 1: 完成支付, 2: 已退款"
 */
var schema = {
	id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	company_id: Sequelize.INTEGER,
	order_type: Sequelize.INTEGER,
	pay_type: Sequelize.INTEGER,
	trade_id: Sequelize.STRING(30),
	total_fee: Sequelize.INTEGER,
	order_info_id: Sequelize.INTEGER,
	op_id: Sequelize.INTEGER,
	op_name: Sequelize.STRING(20),
	qrcode: Sequelize.STRING(255),
	remarks: Sequelize.STRING(255),
	last_balance: Sequelize.INTEGER,
	device_name: Sequelize.STRING(16),
	device_desc: Sequelize.INTEGER(128),
	device_ip: Sequelize.INTEGER(30)
};

var CompanyOrders = Model(user_center, 'company_orders', schema);
CompanyOrders.belongsTo(Company, {as: 'company', foreignKey: {name: 'company_id', type: Sequelize.INTEGER}});

module.exports = CompanyOrders;
