/**
 * lonso @ 15-5-14_Sun.
 * lonso@foxmail.com
 */
var Sequelize = require('sequelize');
var sudiyi_emds = require('../../db/mysql.js').sudiyi_emds;
var Model = require('../../db/Model.js');
var helper = require('../../utils/helper.js');
var BOSSERROR = require('../../const/boss_error.js');

var validation = function (item, options, fn) {
	if (item.min >= item.max || item.begin >= item.end)
		return helper.throwError(BOSSERROR.e210005);
	else
		fn(null, item);
};

var schema = {
	id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	name: Sequelize.STRING(100),
	begin: Sequelize.INTEGER,
	end: Sequelize.INTEGER,
	min: Sequelize.INTEGER,
	max: Sequelize.INTEGER,
	bonus: Sequelize.INTEGER,
	weight: Sequelize.INTEGER,
	isvalid: Sequelize.BOOLEAN
};

module.exports = Model(sudiyi_emds, 'edms_bonus', schema, validation);