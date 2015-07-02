/**
 * lonso @ 15-4-15_Sun.
 */
var config = {
	env: 'production',
	"cacheTime": 60 * 60, //单位秒
	port: 4004,
	"tmp": "/data/logs/sudiyi/edms",
	log: {
		logPath: '/data/logs/sudiyi/edms',
		logLevel: 'INFO'
	},
	mysql: {
		user_center: {
			host: "rds2yqr32riinmi.mysql.rds.aliyuncs.com",
			port: 3306,
			database: 'user_center',
			username: 'sudiyi_edms',
			password: 'sudiyi_edms10055'
		},
		"sudiyi_operation": {
			host: "rdszjeennzjeenn.mysql.rds.aliyuncs.com",
			port: 3306,
			database: 'sudiyi_operation',
			username: 'sudiyi_edms',
			password: 'sudiyi_edms10055'
		},
		"sudiyi_edms": {
			"host": "rds2yqr32riinmi.mysql.rds.aliyuncs.com",
			"port": 3306,
			"database": "sudiyi_edms",
			"username": "sudiyi_edms",
			"password": "sudiyi_edms10055"
		},
		"sudiyi_business": {
			"host": "rdszjeennzjeenn.mysql.rds.aliyuncs.com",
			"port": 3306,
			"database": "sudiyi_business",
			"username": "sudiyi_edms",
			"password": "sudiyi_edms10055"
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
			host: 'http://10.160.61.100:3700',
			path: '/api/sms/send'
		},
		order: {    //修改手机号、重发短信
			"host": "http://121.43.196.99",
			port: 3700,
			path: '/package/notify/sms'
		}
	}
};

module.exports = config;