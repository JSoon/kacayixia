/**
 * lonso @ 15-4-15_Sun.
 */
var config = {
	env: 'test',
	port: 4004,
	"cacheTime": 60 * 60, //单位秒
	"tmp": "/var/log/sudiyi/lis",
	log: {
		logPath: '/var/log/sudiyi/lis',
		logLevel: 'DEBUG'
	},
	mysql: {
		user_center: {
			host: "10.160.50.227",
			port: 3306,
			database: 'user_center',
			username: 'live',
			password: 'b80ff3b3f510f168931b'
		},
		"sudiyi_operation": {
			host: "10.160.50.227",
			port: 3306,
			database: 'sudiyi_operation',
			username: 'live',
			password: 'b80ff3b3f510f168931b'
		},
		"sudiyi_edms": {
			"host": "10.160.50.227",
			"port": 3306,
			"database": "sudiyi_edms",
			"username": "live",
			"password": "b80ff3b3f510f168931b"
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
			host: '10.160.50.227',
			port: 4539,
			opts: {
				password: 'McGGkOmN7eLBY9Xu'
			}
		}
	},
	sms: {
		send: {
			host: 'http://test.sms.sudiyi.cn',
			path: '/api/sms/send'
		},
		order: {    //修改手机号、重发短信
			"host": "http://121.43.196.99",
			port: 3700,
			path: '/package/notify/sms'
		}
	},
	"feeRules": {
		"host": "http://10.160.50.227:3700",
		"api": "/api/fee_rules"
	}
};

module.exports = config;