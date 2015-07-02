/**
 * lonso @ 15-4-22_Sun.
 * lonso@foxmail.com
 */
var helper = require('../helper.js');
var config = require('../../config/config.js');
var server = require('./server.js');
var jwt = require('koa-jwt');

module.exports = RequestHelper;


function RequestHelper(host) {
	this.server = server(host);
	return this;
}

RequestHelper.prototype.postData = function *(data, business_type) {
	var post = "business_type=" + business_type + "&data=";
	post += JSON.stringify(data);
	post += '&sign=' + (yield helper.md5(JSON.stringify(data) + config.business.keys[business_type]));
	return post
};


RequestHelper.prototype.getData = function *(uri, data, business_type) {
	var sign = yield helper.md5(JSON.stringify(data) + config.business.keys[business_type]);
	return uri + '?data=' + JSON.stringify(data) + '&business_type=' + business_type + '&sign=' + sign;
};

RequestHelper.prototype.get = function *(url, data, business_type) {
	var uri = yield this.getData(url, data, business_type);
	var res = yield this.server.get(uri)
		.set('Content-Type', 'application/json')
		.expect(200)
		.end();
	return res.body;
};


RequestHelper.prototype.post = function *(uri, data, business_type) {
	var post = yield this.postData(data, business_type);
	var res = yield this.server.post(uri)
		.send(post)
		.expect(200)
		.end();
	return res.body;
};


RequestHelper.prototype.delete = function *(uri, data, business_type) {
	var post = yield this.postData(data, business_type);
	var res = yield server.delete(uri)
		.send(post)
		.expect(200)
		.end();
	return res.body;
};
