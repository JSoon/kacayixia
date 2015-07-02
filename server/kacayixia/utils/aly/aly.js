/**
 * lonso @ 15-4-23_Sun.
 * lonso@foxmail.com
 */
var ALY = require('aliyun-sdk');
var config = require('../../config/config.js');

var oss = new ALY.OSS({
	accessKeyId: config.oss.key,
	secretAccessKey: config.oss.secret,
	endpoint: config.oss.region,
	apiVersion: '2013-10-15'
});

module.exports = {
	oss: oss
};
