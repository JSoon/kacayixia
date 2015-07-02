/**
 * lonso @ 15-4-30_Sun.
 * lonso@foxmail.com
 */
var config = require('../config/config.js');
var redis = require('redis');
var wrapper = require('co-redis');
var client = redis.createClient(config.redis.cache.port, config.redis.cache.host, {no_ready_check: true});
client.auth(config.redis.cache.opts.password);
var cache = wrapper(client);
exports.cache = cache;
