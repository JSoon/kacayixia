/**
 * lonso @ 15-5-27_Sun.
 * lonso@foxmail.com
 */

var jwt = require('koa-jwt');
var helper = require('../../utils/helper.js');
var BOSSERROR = require('../../const/boss_error.js');
var logger = require('../../logger/logger.js').logger;

module.exports = function () {
	return function*(next) {
		var notCheck = ['/edms/expresses/register', '/edms/expresses/mobile'];
		var url = this.request.url.split('?')[0];
		if (!!~notCheck.indexOf(url)) return yield* next;
		var host = this.request.header.host;
		var ua = this.request.header['user-agent'];
		var auth = this.header.authorization.split(' ')[1];
		var token = jwt.decode(auth);
		logger.info('[request][client][courier:%s(%s)][id: %s][host: %s][ua: %s]',
			token.name, token.mobile, token.id, token.host, token.ua);
		if (token.ua != ua || token.host != host)
			return helper.throwError(BOSSERROR.e200008);
		else
			yield* next;
	}
};
