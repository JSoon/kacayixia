/**
 * lonso @ 15-6-2_Sun.
 * lonso@foxmail.com
 */

var Sequelize = require('sequelize');
var sudiyi_emds = require('../../db/mysql.js').sudiyi_emds;
var Model = require('../../db/Model.js');

var schema = {
	id: Sequelize.STRING(36),
	op_id: Sequelize.INTEGER,
	mobile: Sequelize.STRING(11),
	old_mobile: Sequelize.STRING(11),
	remark: Sequelize.STRING,
	barcode: Sequelize.STRING(20),
	company_id: Sequelize.INTEGER
};

module.exports = Model(sudiyi_emds, 'edms_resend_sms', schema);