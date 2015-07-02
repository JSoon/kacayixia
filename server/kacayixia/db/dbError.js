/**
 * lonso @ 15-4-16_Sun.
 * lonso@foxmail.com
 */

var apiError = require('../const/boss_error.js');

module.exports = {
	ERRORNAME: {
		UNIQUE: 'SequelizeUniqueConstraintError'
	},
	SequelizeUniqueConstraintError: apiError.e200003

};