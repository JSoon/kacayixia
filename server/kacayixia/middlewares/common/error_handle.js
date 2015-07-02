/**
 * lonso @ 15-4-16_Sun.
 * lonso@foxmail.com
 */
var logger = require('../../logger/logger.js').logger;
var apiError = require('../../const/boss_error.js');
var dbError = require('../../db/dbError.js');
var constSettings = require('../../const/const.js');

function *errorInfo(e) {
	var info = {};
	if (e.name === constSettings.ERRORTAG.JWT401) {
		info = apiError.e200006;
	} else {
		try {
			info = dbError[e.name] || JSON.parse(e.message);
		} catch (e) {
			info = apiError.e200000;
		}
	}
	info.data = [];
	return info;
}


module.exports = function *(next) {
	try {
		yield* next;
	} catch (e) {
		logger.error('[error] [r_id: %s]', this.requestId, e);
		var error = yield errorInfo(e);
		this.status = error.status;
		this.body = {code: error.code, message: error.message};
	}
};