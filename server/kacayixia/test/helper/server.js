/**
 * lonso @ 15-4-16_Sun.
 */
'use strict';
var app = require('../../app.js');
var config = require('../../config/config.js');
var cosuper = require('co-supertest');
var server = '';
if (config.env === 'test')
	server = cosuper('http://test.lis.sudiyi.cn');
else if (config.env === 'production')
	server = cosuper('http://lis.sposter.net');
else
	server = cosuper(app.listen());

module.exports = server;