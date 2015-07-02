/**
 * lonso @ 15-5-13_Sun.
 * lonso@foxmail.com
 */
var Sequelize = require('sequelize');
var sudiyi_emds = require('../../db/mysql.js').sudiyi_emds;
var Model = require('../../db/Model.js');

var schema = {
	id: {type: Sequelize.STRING},
	company_id: Sequelize.INTEGER,
	parent_id: Sequelize.INTEGER,
	scope: Sequelize.TEXT,
	open_time: Sequelize.INTEGER,
	close_time: Sequelize.INTEGER
};
var Company_Rel = Model(sudiyi_emds, 'company_rel', schema);
module.exports = Company_Rel;