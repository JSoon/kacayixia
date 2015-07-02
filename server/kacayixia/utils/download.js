/**
 * lonso @ 15-5-21_Sun.
 * lonso@foxmail.com
 */
"use strict";

var urlencode = require('urlencode');
var fs = require('fs');
var thunkify = require('thunkify-wrap');
var moment = require('moment');
var constSettings = require('../const/const.js');
module.exports = function *(path, name, type) {
	name = name + '_' + moment().format(constSettings.DATEFORMAT.FILE) + constSettings.EXCEL.FILETYPE;
	this.attachment(name);
	this.type = type;
	this.body = fs.readFileSync(path);
};