/**
 * lonso @ 15-5-21_Sun.
 * lonso@foxmail.com
 */

"use strict";
var SpreadsheetWriter = require('pyspreadsheet').SpreadsheetWriter;
var path = require('path');
var FilePath = path.resolve(__dirname, '..', 'excels');
var thunkify = require('thunkify-wrap');
var logger = require('../logger/logger.js').logger;

/**
 * headers: 表头
 * datas: 数据
 */
var excelExport = function * (headers, datas) {
	headers = headers || [];
	datas = datas || [];
	var file = FilePath + '/' + new Date().getTime() + '.xlsx';
	var writer = new SpreadsheetWriter(file);
	for (var i = 0; i < headers.length; i++) {
		writer.write(0, i, headers[i]);
	}

	for (var i = 0; i < datas.length; i++) {
		var data = datas[i] || [];
		for (var j = 0; j < data.length; j++) {
			writer.write(i + 1, j, data[j]);
		}
	}
 yield thunkify(function (callback) {
		writer.save(function (err) {
			if (err) {
				logger.error('[excelExport] [file: %s]', file, err);
				callback(err)
			} else
				callback()
		});
	});
	return file;
};


module.exports = {
	excelExport: excelExport
};