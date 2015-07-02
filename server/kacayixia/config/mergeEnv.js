/**
 * lonso @ 15-4-15_Sun.
 */
"use strict";

var envs = ['TEST', 'DEVELOPMENT', 'PRODUCTION'];
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var configPath = path.join(__dirname, 'config.js');
var configBakPath = path.join(__dirname, 'config_bak.js');
var edmsPath = path.join(__dirname, '..', 'config/migration/sudiyi_edms.json');
var edmsBakPath = path.join(__dirname, '..', 'config/migration/sudiyi_edms_bak.json');
var userCenterPath = path.join(__dirname, '..', 'config/migration/user_center.json');
var userCenterBakPath = path.join(__dirname, '..', 'config/migration/user_center_bak.json');

var defaults = _.partialRight(_.assign, function (value, other) {
	if (typeof value == 'object' || typeof other == 'object')
		return defaults(value, other);
	else
		return typeof value == 'undefined' ? (value || "") : other;

});

var mergeConfig = function (env) {
	var config = require('./config.js');
	var mergeConfig = '';
	if (env.toUpperCase() === 'TEST') {
		mergeConfig = require('./env/test.js')
	} else if (env.toUpperCase() === 'DEVELOPMENT') {
		mergeConfig = require('./env/development.js')
	} else {
		mergeConfig = require('./env/production.js')
	}
	config = defaults(config, mergeConfig);
	fs.createReadStream(configPath).pipe(fs.createWriteStream(configBakPath));
	fs.writeFileSync(configPath, 'var config = ' + JSON.stringify(config, null, 2) + '; \n\nmodule.exports = config;');
	fs.unlinkSync(configBakPath);
	return config;

};

var mergeMigration = function (env, jsonPath, targetConfig, path, bakPath) {
	env = env.toLowerCase();
	var jsonFile = require(jsonPath);
	fs.createReadStream(path).pipe(fs.createWriteStream(bakPath));
	jsonFile[env] = defaults(jsonFile[env], targetConfig);
	fs.writeFileSync(path, JSON.stringify(jsonFile, null, 2));
	fs.unlinkSync(bakPath);
};


var mergeMigrationConfig = function (config, env) {
	var user_center = config.mysql.user_center;
	var sudiyi_edms = config.mysql.sudiyi_edms;
	if (env.toUpperCase() === 'TEST') {
		mergeMigration(env, './migration/sudiyi_edms.json', sudiyi_edms, edmsPath, edmsBakPath);
		mergeMigration(env, './migration/user_center.json', user_center, userCenterPath, userCenterBakPath);
	} else if (env.toUpperCase() === 'DEVELOPMENT') {
		mergeMigration(env, './migration/sudiyi_edms.json', sudiyi_edms, edmsPath, edmsBakPath);
		mergeMigration(env, './migration/user_center.json', user_center, userCenterPath, userCenterBakPath);
	} else {
		mergeMigration(env, './migration/sudiyi_edms.json', sudiyi_edms, edmsPath, edmsBakPath);
		mergeMigration(env, './migration/user_center.json', user_center, userCenterPath, userCenterBakPath);
	}

};

function main() {
	var env = process.argv[2];
	if (env && !!~envs.indexOf(env.toUpperCase())) {
		var config = mergeConfig(env);
		mergeMigrationConfig(config, env)
	} else {
		console.log("env args must be in ['TEST', 'DEVELOPMENT', 'PRODUCTION']");

	}
}


main();