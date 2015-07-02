/**
 * lonso @ 15-5-12_Sun.
 * lonso@foxmail.com
 */

var Sequelize = require('sequelize');
var sudiyi_operation = require('../../db/mysql.js').sudiyi_operation;
var Model = require('../../db/Model.js');


var schema = {
	id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	name: Sequelize.STRING(20),
	level: Sequelize.INTEGER(6),
	father_id: Sequelize.BIGINT(20)
};

module.exports = Model(sudiyi_operation, 'areas', schema);