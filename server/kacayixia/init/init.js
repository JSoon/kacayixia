/**
 * lonso @ 15-4-15_Sun.
 */

var fs = require('fs');
var Promise = require('bluebird');
var path = require('path');
var modelPath = path.resolve(__dirname, '..', 'models');
var readOnlyModels = ['areas_model.js'];

var getModelPath = function (modelPath, requirePaths) {
	var files = fs.readdirSync(modelPath);
	return Promise.resolve(files).map(function (file) {
		if (fs.statSync(path.join(modelPath, file)).isDirectory()) {
			return getModelPath(path.join(modelPath, file), requirePaths)
		} else {
			if (!~readOnlyModels.indexOf(file))
				return Promise.resolve(requirePaths.push(path.join(path.relative(file, modelPath), file)))
		}
	})
};

var init = function () {
	var requirePaths = [];
	return getModelPath(modelPath, requirePaths).then(function () {
		return Promise.resolve(requirePaths)
	}).map(function (requirePath) {
		return require(requirePath).sync()
		}).then(function () {
			return Promise.resolve()
		});
};


require('./cron/notification_cron.js');
module.exports = init;