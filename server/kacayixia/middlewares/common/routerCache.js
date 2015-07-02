/**
 * lonso @ 15-4-30_Sun.
 * lonso@foxmail.com
 */

var crypto = require('crypto');
var constSettings = require('../../const/const.js');
var md5 = function *(str) {
	return crypto.createHash('md5').update(str).digest('hex');
};

module.exports = function (redis) {
	return function*(next) {
		var key = yield md5(this.url + this.method);
		this.cache = key;
		var listKey = constSettings.REDISKEY.LIST + key;
		var readKey = constSettings.REDISKEY.READ + key;
		var cacheValue = (yield redis.get(listKey)) || (yield redis.get(readKey));
		if (this.method && this.method.toUpperCase() === 'GET' && cacheValue)
			this.body = JSON.parse(cacheValue);
		else
			yield* next;
	}
};