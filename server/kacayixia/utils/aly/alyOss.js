/**
 * Created by lonso on 14-12-8.
 * liusc@polyvi.com
 */
'use strict';
var aly = require('./aly.js');
var mime = require('mime');
var path = require('path');
var helper = require('../../utils/helper.js');
var thunkify = require('thunkify-wrap');
var config = require('../../config/config.js');


var doOssUpload = exports.doOssUpload= function (dist, key, body, callback) {
	var suffix = path.extname(key);
	var bucketName = 'sudiyi-edms';
	var bucket = path.join(bucketName, dist, key);
	var putObj = {
		Bucket: 'sudiyi-edms',
		Key: bucket,
		Body: body,
		AccessControlAllowOrigin: '',
		ContentType: suffix ? mime.lookup(suffix) : 'text/plain',
		CacheControl: 'no-cache',
		ContentDisposition: '',
		ContentEncoding: 'utf-8',
		ServerSideEncryption: 'AES256',
		Expires: 60
	};
	aly.oss.putObject(putObj, function (err, data) {
		callback(err, config.oss.host + bucket);
	});
};


exports.ossUpload = function * (dist, key, body) {
	var suffix = path.extname(key);
	key = (yield helper.md5(key + new Date())) + suffix;
	return yield thunkify(function (callback) {
		doOssUpload(dist, key, body, function (err, data) {
			callback(err, data);
		})
	});
};