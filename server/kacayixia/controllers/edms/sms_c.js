/**
 *  lonso on_mars 15-6-11.
 */
var response = require('../../utils/response.js');
var sms = require('../../utils/sms.js');
var constSettings = require('../../const/const.js');
var util = require('util');
var helper = require('../../utils/helper.js');
var BOSSERROR = require('../../const/boss_error.js');
var cache = require('../../db/redis.js').cache;

exports.send = function *() {
	var body = this.request.body.data;
	var mobile = body.mobile;
	var content = '';
	var captcha = parseInt(Math.random(100000 - 1000000) * 1000000);
	var source = body.source;
	var redisKey = 'sms:%s:%s';
	if (!helper.checkCellPhone(mobile)) return helper.throwError(BOSSERROR.e210010);
	if (!source)
		return helper.throwError(BOSSERROR.e210014);

	content = util.format(constSettings.SMS.CONTENT[source.toUpperCase()], captcha, constSettings.SMS.EXPIRED / 60);
	var registerKey = util.format(redisKey, source, mobile);
	yield cache.set(registerKey, captcha);
	yield cache.expire(registerKey, constSettings.SMS.EXPIRED);
	return yield response.call(this, yield sms.send(mobile, content));
};


exports.verify = function *() {
	var body = this.request.body.data;
	var mobile = body.mobile;
	var redisKey = 'sms:%s:%s';
	var source = body.source;
	var captcha = body.captcha;

	if (!helper.checkCellPhone(mobile)) return helper.throwError(BOSSERROR.e210010);
	if (!source)
		return helper.throwError(BOSSERROR.e210014);

	var registerKey = util.format(redisKey, source, mobile);
	var redisCaptcha = yield cache.get(registerKey);
	if (redisCaptcha == captcha) {
		yield cache.del(registerKey);
		return yield response.call(this, []);
	} else
		return helper.throwError(BOSSERROR.e210013);

};