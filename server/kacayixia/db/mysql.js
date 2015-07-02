/**
 * lonso @ 15-4-15_Sun.
 */
var Sequelize = require('sequelize');
var config = require('../config/config.js');
var logger = require('../logger/logger.js').logger;
var user_center = new Sequelize(config.mysql.user_center.database,
	config.mysql.user_center.username,
	config.mysql.user_center.password, {
		logging: function (str) {
			logger.info('[process:%s]', process.pid,str)
		},
		host: config.mysql.user_center.host,
		port: config.mysql.user_center.port,
		dialect: 'mysql',
		pool: {
			max: 20,
			min: 0,
			idle: 10000
		}
	});

var sudiyi_operation = new Sequelize(config.mysql.sudiyi_operation.database,
	config.mysql.sudiyi_operation.username,
	config.mysql.sudiyi_operation.password, {
		logging: function (str) {
			logger.info('[process:%s]', process.pid,str)
		},
		host: config.mysql.sudiyi_operation.host,
		port: config.mysql.sudiyi_operation.port,
		dialect: 'mysql',
		pool: {
			max: 20,
			min: 0,
			idle: 10000
		}
	});

var sudiyi_emds = new Sequelize(config.mysql.sudiyi_edms.database,
	config.mysql.sudiyi_edms.username,
	config.mysql.sudiyi_edms.password, {
		logging: function (str) {
			logger.info('[process:%s]', process.pid,str)
		},
		host: config.mysql.sudiyi_edms.host,
		port: config.mysql.sudiyi_edms.port,
		dialect: 'mysql',
		pool: {
			max: 20,
			min: 0,
			idle: 10000
		}
	});

var sudiyi_business = new Sequelize(config.mysql.sudiyi_business.database,
	config.mysql.sudiyi_business.username,
	config.mysql.sudiyi_business.password, {
		logging: function (str) {
			logger.info('[process:%s]', process.pid,str)
		},
		host: config.mysql.sudiyi_business.host,
		port: config.mysql.sudiyi_business.port,
		dialect: 'mysql',
		pool: {
			max: 20,
			min: 0,
			idle: 10000
		}
	});


exports.user_center = user_center;
exports.sudiyi_operation = sudiyi_operation;
exports.sudiyi_emds = sudiyi_emds;
exports.sudiyi_business = sudiyi_business;