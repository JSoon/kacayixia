/**
 * lonso @ 15-4-15_Sun.
 */
var config = {
	env: 'development',
	port: 3000,
	"cacheTime": 60 * 60, //单位秒
	log: {
		logPath: '/home/lonso/workspace/sudiyi/sudiyi_edms_new/logs',
		logLevel: 'DEBUG'
	},
	"tmp": "/home/lonso/workspace/sudiyi/sudiyi_edms_new/tmp",
	mysql: {
		user_center: {
			host: "127.0.0.1",
			port: 3306,
			database: 'user_center',
			username: 'root',
			password: ""
		},
		"sudiyi_operation": {
			host: "127.0.0.1",
			port: 3306,
			"database": "sudiyi_operation",
			"username": "root",
			"password": ""
		},
		"sudiyi_edms": {
			"host": "127.0.0.1",
			"port": 3306,
			"database": "sudiyi_edms",
			"username": "root",
			"password": ""
		},
		"sudiyi_business": {
			"host": "127.0.0.1",
			"port": 3306,
			"database": "sudiyi_business",
			"username": "root",
			"password": ""
		}
	},
	redis: {
		cache: {
			host: '127.0.0.1',
			port: 6379,
			opts: {
				password: ''
			}
		}
	},
	sms: {
		send: {
			host: 'http://test.sms.sudiyi.cn',
			path: '/api/sms/send'
		},
		order: {    //修改手机号、重发短信
			host: 'http://u.sudiyi.cn',
			port: 3700,
			path: '/package/notify/sms'
		}
	},
	"feeRules": {
		"host": "http://112.124.50.175:3700",
		"api": "/api/fee_rules"
	}
};

module.exports = config;