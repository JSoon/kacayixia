/**
 * lonso @ 15-6-3_Sun.
 * lonso@foxmail.com
 */
var Sequelize = require('sequelize');
var user_center = require('../../db/mysql.js').user_center;
var Model = require('../../db/Model.js');

var schema = {
	id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	company_id: Sequelize.INTEGER,
	city: Sequelize.INTEGER,
	free_date: {type: Sequelize.INTEGER, defaultValue: 24},
	op_id: Sequelize.INTEGER,
	op_name: Sequelize.STRING
};

module.exports = Model(user_center, 'free_storing', schema);