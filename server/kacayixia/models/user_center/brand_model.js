/**
 * lonso @ 15-5-11_Sun.
 * lonso@foxmail.com
 */
var Sequelize = require('sequelize');
var user_center = require('../../db/mysql.js').user_center;
var Model = require('../../db/Model.js');

var schema = {
	id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	name: Sequelize.STRING,
	company_count: Sequelize.INTEGER,
	courier_count: Sequelize.INTEGER,
	fee_rules_id: Sequelize.INTEGER,
	app_display: Sequelize.BOOLEAN
};

module.exports = Model(user_center, 'courier_brands', schema);