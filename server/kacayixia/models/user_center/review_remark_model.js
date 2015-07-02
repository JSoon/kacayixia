/**
 * lonso @ 15-5-13_Sun.
 * lonso@foxmail.com
 */

var Sequelize = require('sequelize');
var user_center = require('../../db/mysql.js').user_center;
var Model = require('../../db/Model.js');

var schema = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	created_at: Sequelize.INTEGER,
	updated_at: Sequelize.INTEGER,
	op_id: {
		type: Sequelize.INTEGER,
		comment: '操作员Id',
		allowNull: false
	},
	op_name: {
		type: Sequelize.STRING(20),
		comment: '操作员姓名',
		allowNull: false

	},
	remark: Sequelize.STRING,
	target_id: {
		type: Sequelize.INTEGER,
		comment: '对象ID，包括快递员，快递公司等',
		allowNull: false
	},
	type: {
		type: Sequelize.INTEGER,
		comment: '对象类库，包括快递员，快递公司等',
		allowNull: false
	}
};

module.exports = Model(user_center, 'review_remark', schema);