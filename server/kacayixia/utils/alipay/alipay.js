/**
 * lonso @ 15-3-27_Sun.
 */
var dep = require('../../common/dependencies.js');


function Alipay(alipay_config) {
	this.alipay_gateway = 'https://mapi.alipay.com/gateway.do?';
	this.alipay_config = {};
	for (var key in alipay_config) {
		this.alipay_config[key] = alipay_config[key];
	}
	return this;
}

Alipay.prototype.paraFilter = function (para) {
	var para_filter = {};
	for (var key in para) {
		if (para[key] && (key != 'sign' || key != 'sign_type'))
			para_filter[key] = para[key];
	}
	return para_filter;
};


Alipay.prototype.argSort = function (para) {
	var result = {};
	var keys = Object.keys(para).sort();
	for (var i = 0; i < keys.length; i++) {
		result[keys[i]] = para[keys[i]];
	}
	return result;
};

Alipay.prototype.sign = function (para_sort) {
	var signatureVal = [];
	for (var key in para_sort) {
		var _v = key + '=' + para_sort[key];
		signatureVal.push(_v);
	}
	return dep.crypto.createHash('md5').update(signatureVal.join('&') + this.alipay_config['key'], 'utf8').digest("hex");
};

Alipay.prototype.getURI = function (args) {
	args.sign_type = 'MD5';
	var val = [];
	for (var key in args) {
		var _v = key + '=' + args[key];
		val.push(_v);
	}
	return this.alipay_gateway + val.join('&');
};


Alipay.prototype.payByUser = function (order) {
	order.notify_url = this.alipay_config.host + this.alipay_config.create_direct_pay_by_user_notify_url;
	order.partner = this.alipay_config.partner;
	order.payment_type = 1;
	order.return_url = this.alipay_config.host + this.alipay_config.create_direct_pay_by_user_return_url;
	order.seller_email = this.alipay_config.seller_email;
	order.service = 'create_direct_pay_by_user';
	order._input_charset = this.alipay_config['input_charset'].toLowerCase().trim();
	order.sign = this.sign(this.argSort(this.paraFilter(order)));
	return this.getURI(order)
};


Alipay.prototype.verifyApp = function (params, alipayPubKey) {
	var paramsToSign = [];
	for (var name in params) {
		if (name != 'sign' && name != 'sign_type') {
			paramsToSign.push(name + '=' + params[name])
		}
	}
	paramsToSign.sort();
	var prestr = paramsToSign.join('&');
	prestr = unescape(encodeURIComponent(prestr)); // force convert to utf8
	if (params.sign_type == 'RSA') {
		return dep.crypto.createVerify('RSA-SHA1')
			.update(prestr)
			.verify(alipayPubKey, params.sign, 'base64')
	} else {
		return true
	}
};

Alipay.prototype.handleReqStream = function (data) {
	var values = data.split('&');
	var result = {};
	for (var i = 0; i < values.length; i++) {
		var tmp = values[i].split('=');
		result[tmp[0]] = dep.urlencode.decode(tmp[1], 'utf-8')
	}
	return result;
};


Alipay.prototype.checkRequest = function (obj) {
	var that = this;
	return new dep.Promise(function (resolve, reject) {
		var args = "service=notify_verify&partner=" + that.alipay_config.partner + "&notify_id=" + obj.notify_id;
		var checkURI = that.alipay_gateway + args;
		dep.request(checkURI).then(function (data) {
			if (data[1] === 'true') {
				return resolve()
			} else {
				return reject();
			}
		})
	})
};

Alipay.prototype.hotFixURLDecode = function (argSort) {
	var keys = ['gmt_create', 'gmt_payment', 'notify_time'];
	for (var i = 0; i < keys.length; i++) {
		argSort[keys[i]] = argSort[keys[i]].replace('+', ' ')
	}
	return argSort;
};

Alipay.prototype.verifyWeb = function (params) {
	var sign = params.sign;
	delete params.sign;
	delete params.sign_type;
	var argSort = this.hotFixURLDecode(this.argSort(params));
	var signV = this.sign(argSort);
	return sign === signV;
};

Alipay.prototype.getTradeStatus = function (trade_id) {
	var order = {};
	order.partner = this.alipay_config.partner;
	order.service = 'single_trade_query';
	order._input_charset = this.alipay_config['input_charset'].toLowerCase().trim();
	order.out_trade_no = trade_id;
	order.sign = this.sign(this.argSort(this.paraFilter(order)));
	return this.getURI(order)
};

Alipay.prototype.accountPageQuery = function (pageNo) {
	var order = {};
	order.partner = this.alipay_config.partner;
	order.service = 'account.page.query';
	order._input_charset = this.alipay_config['input_charset'].toLowerCase().trim();
	order.page_no = pageNo || 1;
	order.page_size = 100;
	order.gmt_start_time = dep.moment().add(-1, 'd').format(dep.constSettings.DATEFORMART.GMT);
	order.gmt_end_time = dep.moment().format(dep.constSettings.DATEFORMART.GMT);
	order.trans_code  = 6001;
	order.sign = this.sign(this.argSort(this.paraFilter(order)));
	return this.getURI(order)
};



module.exports = new Alipay(dep.config.get().alipay);

//var alipay = new Alipay(dep.config.get().alipay);
//console.log(alipay.getTradeStatus());
//console.log(alipay.accountPageQuery())
//var data = {
//	out_trade_no: 1234,
//	subject: 'test1',
//	total_fee: 0.01,
//	body: 1,
//	show_url: 'http://www.baidu.com'
//};
//
//var responseV = 'discount=0.00&payment_type=1&subject=test1&trade_no=2015033000001000540050628945&buyer_email=49146159%40qq.com&gmt_create=2015-03-30+16%3A15%3A56&notify_type=trade_status_sync&quantity=1&out_trade_no=1234&seller_id=2088311868782039&notify_time=2015-03-30+16%3A16%3A03&body=1&trade_status=TRADE_SUCCESS&is_total_fee_adjust=N&total_fee=0.01&gmt_payment=2015-03-30+16%3A16%3A03&seller_email=caiwu%40sudiyi.net&price=0.01&buyer_id=2088002045316544&notify_id=35865103c93b6c3c7d4566ca1b167d6650&use_coupon=N&sign_type=MD5&sign=2e9922230dbfcb8e6eaa9f6fc2ee8689';
////
//console.log(alipay.verifyWeb(responseV))

//https://mapi.alipay.com/gateway.do?service=single_trade_query&sign=d8ed9f015214e7cd59bfadb6c945a87b&trade_no=2010121502730740&partner=2088001159940003&out_trade_no=2109095506028810&sign_type=MD5
//https://mapi.alipay.com/gateway.do?partner=2088311868782039&service=single_trade_query&_input_charset=utf-8&sign=ce1d5a35d73b9c1a56e1fea740af3bf6&trade_no=2015042309593147&sign_type=MD5