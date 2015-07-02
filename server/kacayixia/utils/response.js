/**
 * lonso @ 15-5-13_Sun.
 * lonso@foxmail.com
 */
var constSettings = require('../const/const.js');
var config = require('../config/config.js');
var cache = require('../db/redis').cache;
var _ = require('lodash');
var logger = require('../logger/logger.js').logger;
var moment = require('moment');

module.exports = function *() {
	var data = arguments[0] || [];
	var redisKey = arguments[1] || '';
	var response = constSettings.RESPONSE.SUCCESS;
	response.data = data;
	if (redisKey) {
		var id = arguments[2];
		var cacheKey = redisKey + this.cache;
		yield cache.setex(cacheKey, config.cacheTime, JSON.stringify(response));
		if (id) {
			var objCacheKeys = (yield cache.get(id)) || {};
			if (_.isEmpty(objCacheKeys) && _.isEmpty(objCacheKeys.cacheKeys)) {
				yield cache.setex(id, config.cacheTime, JSON.stringify({
					cacheKeys: [cacheKey]
				}));
			} else {
				var tmp = JSON.parse(objCacheKeys).cacheKeys;
				tmp.push(cacheKey);
				yield cache.setex(id, config.cacheTime, JSON.stringify({
					cacheKeys: tmp
				}));
			}
		}
	}

	logger.info('[response][r_id:%s][cost:%s]', this.requestId, moment().format('x') - this.requestStart);

	this.body = response;
};