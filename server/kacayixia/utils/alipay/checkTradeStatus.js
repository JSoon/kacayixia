/**
 * lonso @ 15-4-29_Sun.
 * lonso@foxmail.com
 */
var alipay = require('./alipay.js');
var user_center = require('../db.js').userDB;
var db = require('../dbHelper.js');
var Promise = require('bluebird');
var request = require('request');
var parseString = require('xml2js').parseString;

var getTradeStatus = function (tradeInfo) {
	var url = alipay.getTradeStatus(tradeInfo.trade_id);
	var UPDATE = 'update user_center.company_orders set status = ?, remarks = "分部充值" where trade_id = ?';
	return new Promise(function (resolve, reject) {
		request(url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				parseString(body, function (err, result) {
					if (!err) {
						var arg = [];
						if (result.alipay.is_success[0] === 'T') {
							var tradeStatus = result.alipay.response[0].trade[0].trade_status[0];
							console.log('[success]', tradeInfo.trade_id, tradeStatus);
							if (tradeStatus === 'TRADE_SUCCESS') {
								arg.push(1);
							} else {
								arg.push(0);
							}
						} else {
							console.log('[error]', tradeInfo.trade_id, result.alipay.error[0]);
							arg.push(0);
						}
						arg.push(tradeInfo.trade_id);
						db.excuteSQL(UPDATE, arg).then(function () {
							return resolve();
						}).catch(function (err) {
								return reject(err);
							})
					} else {
						return reject();
					}
				})
			} else {
				return reject();
			}
		})
	})


};


var checkTradeStatus = function () {
	var SQL = 'select trade_id from user_center.company_orders where pay_type = 2';
	return db.excuteSQL(SQL, []).then(function (datas) {
		return Promise.resolve(datas)
	}).map(function (data) {
			return getTradeStatus(data)
		}).then(function(){
			return Promise.resolve()
		}).catch(function(err){
			return Promise.reject(err)
		})
};

checkTradeStatus().then(function () {
	console.log('checktradestatus success')
}, function (err) {
	console.log('checktradestatus error', err)
});