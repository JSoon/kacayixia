/**
 * lonso @ 15-4-16_Sun.
 * lonso@foxmail.com
 */

module.exports = {
	USER: {
		USERTYPE: {
			COMMON: 0,
			COURIER: 1
		},
		STATUS: {
			ENABLE: 1, //正常
			PRE_VERIFY: 2,
			EDMS: 4
		},
		VERIFY: {
			UNABLE: 0,		//0 - 未认证, 1 - 等待认证, 2 - 认证通过
			WAIT: 1,
			PASS: 2
		}
	},
	SMS: {
		EXPIRED: 15 * 60,//有效期单位秒
		SEND: {
			business_type: 4,
			private_key: 'LTNgJhb0nYGj8dKq'
		},
		RESEND: {
			USERTYPE: 'CR',
			DEVICETYPE: 'EDMS',
			ACTIONVALUE: 'RESEND'
		},
		SOURCE: {
			REGISTER: 'register'  //注册
		},
		CONTENT: {
			REGISTER: '您正在注册快递分部系统的管理员,您的验证码是【%s】,请尽快使用.(%s分钟内有效期)',
			ADDCOURIER: '您正在快递分部系统添加快递员,您的验证码是【%s】,请尽快使用.(%s分钟内有效期)'
		}
	},
	EXCEL: {
		EXCEL2007: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		FILETYPE: '.xlsx'
	},
	DATEFORMAT: {
		EXPORT: 'YYYY-MM-DD HH:mm:ss',
		FILE: 'YYYY-MM-DD_HH:mm:ss',
		FILENAME: 'YYYYMMDDHHmmss'
	},
	RESPONSE: {
		SUCCESS: {code: 0, message: "success", data: []}
	},
	MODELTYPE: {
		COURIERORDER: 1,
		COMPANYORDER: 2
	},
	ERRORTAG: {
		JWT401: 'UnauthorizedError'
	},
	TYPE: {
		1: '超市/便利店',
		2: '面包甜点',
		3: '食品茶酒',
		4: '五金建材',
		5: '小吃快餐',
		6: '洗衣'
	},
	REDISKEY: {
		LIST: 'list:',
		READ: 'read:'
	},
	COURIERS: {
		STATUS: {
			ENABLE: 1,
			DISABLE: 0
		},
		VERIFY: {
			UNABLE: 0,		//0 - 未认证, 1 - 等待认证, 2 - 认证通过
			WAIT: 1,
			PASS: 2
		},
		ROLE: {
			STAFF: 0,
			ADMIN: 1,
			SUPER: 2,
			BOSS: 8
		},
		ROLENAME: {
			0: '快递员',
			1: '管理员',
			2: '超级管理员'
		}
	},
	COMPANYORDERS: {
		EXCELNAME: '充值记录',
		TYPE: {
			RECHARGE: 1,
			TRANS: 2,
			INCOME: 3,
			REFUNDS: 4, //退回
			SYNC: 5,
			EDMS: 6,
			ADMIN: 7,
			WITHDRAWALS: 8, //提现
			WREFUNDS: 9 //提现退回
		},
		STATUS: {
			UNPAID: 0,
			PAID: 1
		},
		PAIDTYPE: {
			PERSONAL: 1, //个人余额
			ALIPAY: 2, //支付宝
			WXPAY: 3, // 微信
			COMPANY: 4, //公司账户
			WXPACCOUNT: 5 //微信公众号
		},
		HEADERS: ['分部编号', '城市', '快递品牌', '分部名称', '充值时间', '充值金额']
	},
	ORDERS: {
		STATUS: {
			UNPAID: 0,
			PAID: 1
		},
		TYPE: {
			RECHARGE: 1, //充值
			BOOK: 2, //预约箱格
			EXPIRED: 3, //超期付费
			WLL: 4, //我来啦代充值
			SYNC: 5, //新老系统快递员余额同步
			COMPANY: 6, //快递员转回快递公司
			ADMIN: 7 //系统调整
		},
		PAIDTYPE: {
			PERSONAL: 1, //个人余额
			ALIPAY: 2, //支付宝
			WXPAY: 3, // 微信
			COMPANY: 4, //公司账户
			WXPACCOUNT: 5, //微信公众号
			TERMINAL: 6 //终端投币
		}
	},
	CARDS: {
		STATUS: {
			ENABLE: 1,
			DISABLE: 0
		}
	},
	WITHDRAWALS: {
		EXCELNAME: '提现申请记录',
		STATUS: {
			FAILURE: 1, //提现失败
			SUCCESS: 2, //提现成功
			WAIT: 3, //提现申请中
			CANCEL: 4 //用户取消
		},
		HEADERS: ['交易号', '提交时间', '城市', '分部名称', '管理员手机号', '累计寄件收入（元）', '已提现金额', '本次提现金额', '账户余额', '收款方户名', '开户行', '账号']
	},
	REMARK: {
		COURIERORDER: {
			7: '管理员：%s(%s)增加金额 增加金额￥%s元：，余额：￥%s元。调整理由：%s。'
		},
		COMPANYORDER: {
			'PAY': '【%s】向【%s】转账，转账金额￥%s元：，余额：￥%s元。备注：%s。（由【%s】发起操作）',
			'RECEIVE': '【%s】接收【%s】转账，接收金额￥%s元：，余额：￥%s元。备注：%s。（由【%s】发起操作）'
		},
		WITHDRAWALS: {
			0: '用户：%s(%s)提现失败, 提现申请编号：[%s]。返还金额：￥%s元，余额：￥%s元。备注：%s',
			3: '用户：%s(%s)申请提现, 提现银行账号：[%s]。提现金额：￥%s元，余额：￥%s元。',
			4: '用户：%s(%s)取消提现, 提现申请编号：[%s]。返还金额：￥%s元，余额：￥%s元。备注：%s'
		}
	},
	NOTIFICATION: {
		CHANNEL: {
			SMS: 1,
			APP: 2,
			NOTICE: 3
		}
	},
	COMPANY: {
		EXCELNAME: '分部记录',
		VERIFY: {
			DISABLE: 0,		//0 - 未认证, 1 - 等待认证, 2 - 认证通过
			WAIT: 1,
			PASS: 2
		},
		STATUS: {
			ENABLE: 1,
			DISABLE: 0
		},
		HEADERS: ['分部编号', '分部名称', '联系电话', '快递品牌', '城市', '账户余额（元）', '创建人', '审核通过时间']
	},
	EXPRESS: {
		LIST: {
			TYPE: {
				WILLEXCEED: 'willExceed',
				EXCEED: 'exceed',
				REPOST: 'repost'
			}
		},
		DATE: {
			FREEDATE: 24
		},
		STATUS: {
			CANCELED: -1,
			reserved_unpaid: 0,
			reserved_paid: 1,
			DELIVERED: 2,
			CODECHECKED: 3,
			rx_to_rx: 4,
			op_to_rx: 5,
			op_to_cr: 6,
			cr_to_cr: 7,
			rx_to_rx_offline: 8,
			op_to_op: 9,
			op_to_propmgmt: 10
		}
	},
	ORIGIN: {
		EDMS: 1,
		APP: 2
	},
	EDMSORDER: {
		STATUS: {
			CREATE: 1,
			RECEIVE: 2,
			COMPLETE: 3,
			REJECT: 5,
			CANCEL: 6,
			TIMEOUT: 7,
			CLOSE: 8
		}
	}
};
