/**
 * lonso @ 15-4-30_Sun.
 * lonso@foxmail.com
 */

var crypto = require('crypto');
var apiError = require('../const/boss_error.js');
var helper = require('./helper.js');
var logger = require('../logger/logger.js').logger;
var config = require('../config/config.js');

var hotfixUrlEncode = function *(jsonString) {
	var obj = JSON.parse(jsonString);
	var hotfixKeys = ['phone_number', 'owner_phone_number'];
	for (var i = 0; i < hotfixKeys.length; i++) {
		if ((obj[hotfixKeys[i]]))
			obj[hotfixKeys[i]] = (obj[hotfixKeys[i]]).toString().replace(' ', '+');
	}

	return JSON.stringify(obj);
};

var checkSignVal = function *(jsonString, key, sign) {
	if (!jsonString || !key || !sign)
		return helper.throwError(apiError.e200004);
	logger.info('[sign][raw][data: %s][key: %s]', jsonString, key);
	var tmp_sign = yield helper.md5((yield hotfixUrlEncode(jsonString)) + key);
	logger.debug('[sign][client: %s][server: %s]', sign, tmp_sign);
	if (sign.toLocaleLowerCase() != tmp_sign)
		return helper.throwError(apiError.e200004);
	else
		return;
};

module.exports = function *(ctx) {
	var content = '';
	if (ctx.method === 'GET')
		content = ctx.query;
	else
		content = ctx.request.body;
	logger.info('[request][process: %s][access][r_id: %s][uri: %s][method: %s][content: %j]', process.pid,
		ctx.requestId, ctx.url, ctx.method, content);
	yield checkSignVal(content.data,
		config.business.keys[content.business_type],
		content.sign);
};

