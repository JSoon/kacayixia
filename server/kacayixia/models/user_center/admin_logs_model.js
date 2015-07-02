/**
 * lonso @ 15-5-12_Sun.
 * lonso@foxmail.com
 */
var Sequelize = require('sequelize');
var user_center = require('../../db/mysql.js').user_center;
var Model = require('../../db/Model.js');

var schema = {
	id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	event: Sequelize.INTEGER,
	target_id: Sequelize.INTEGER,
	target_info: Sequelize.STRING(255),
	result: Sequelize.STRING(255),
	admin_id: Sequelize.INTEGER,
	admin_info: Sequelize.STRING(100),
	remark: Sequelize.STRING(255),
	created_at: Sequelize.INTEGER
};

module.exports = Model(user_center, 'admin_logs', schema, true);