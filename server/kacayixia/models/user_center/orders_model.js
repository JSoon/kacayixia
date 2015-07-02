/**
 * lonso @ 15-5-12_Sun.
 * lonso@foxmail.com
 */

var Sequelize = require('sequelize');
var user_center = require('../../db/mysql.js').user_center;
var Model = require('../../db/Model.js');

var schema = {
	id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	user_id: Sequelize.INTEGER,
	order_type: Sequelize.INTEGER,
	trade_id: Sequelize.INTEGER,
	pay_type: Sequelize.INTEGER,
	total_fee: Sequelize.INTEGER,
	order_info_id: Sequelize.STRING(40),
	status: Sequelize.INTEGER,
	remarks: Sequelize.STRING(255),
	qrcode: Sequelize.STRING(50),
	lattice_id: Sequelize.INTEGER,
	last_balance: Sequelize.INTEGER,
	op_id: Sequelize.INTEGER,
	op_name: Sequelize.STRING(20),
	device_name: Sequelize.STRING(16),
	device_desc: Sequelize.STRING(128),
	device_ip: Sequelize.STRING(30)
};

module.exports = Model(user_center, 'orders', schema);