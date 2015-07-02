"use strict";
/**
 *
 //自定义子方法
 resource(app)('communities', Lattice, {
		subResources: [
			{name: 'stores', controller: [
				{verb: 'get', fun: 'getStore2Lattice'},
				{verb: 'post', fun: 'addStore2Lattice'}
			]}
		]
	});
 对应method为：Lattice.getStore2Lattice, Lattice.addStore2Lattice
 //标准子方法
 resource(app)('couriers', couriers, {
		subResources: [
			{name: 'logs'}
		]
	});
 对应method为：couriers.createInLogs, couriers.readInLogs,couriers.updateInLogs,couriers.deleteInLogs

 */
var config = require('../config/config.js');

/**
 * lonso @ 15-4-24_Sun.
 * lonso@foxmail.com
 */
var cache = require('../db/redis').cache;
var _ = require('lodash');
var forEach = require('co-foreach');
var constSettings = require('../const/const.js');
var FUN = {
	C: 'create',
	R: 'read',
	U: 'update',
	D: 'delete',
	L: 'list',
	PC: 'createIn',
	PR: 'readIn',
	PU: 'updateIn',
	PD: 'deleteIn'
};

var updateCache = function *(next) {
//	var id = this.params.sub_id || this.params.id || '';
//	if (id) {
//		var objCacheKeys = JSON.parse((yield cache.get(id) || {}));
//		if (!_.isEmpty(objCacheKeys) && !_.isEmpty(objCacheKeys.cacheKeys)) {
//			var cacheKeys = objCacheKeys.cacheKeys;
//			!_.isEmpty(cacheKeys) && (yield forEach(cacheKeys, function * (key) {
//				yield cache.del(key)
//			}));
//			yield cache.del(id);
//		}
//	}
//
//	var listKeys = yield cache.keys(constSettings.REDISKEY.LIST + '*');
//	!_.isEmpty(listKeys) && (yield forEach(listKeys, function * (key) {
//		yield cache.del(key)
//	}));

	yield next;
};


module.exports = function (app, prefix) {
	prefix = prefix || '/edms/';
	return function (resource, controller, opt) {
		if (opt && opt.actions) {
			opt.actions.forEach(function (action) {
				controller[action.name] && app[action.verb || 'get'](prefix + resource + '/' + action.name, controller[action.name]);
			})
		}

		controller[FUN.C] && app.post(prefix + resource, updateCache, controller.create);
		controller[FUN.R] && app.get(prefix + resource + '/:id', controller.read);
		controller[FUN.U] && app.post(prefix + resource + '/:id', updateCache, controller.update);
		controller[FUN.L] && app.get(prefix + resource, controller.list);
		controller[FUN.D] && app.delete(prefix + resource + '/:id', updateCache, controller.delete);

		if (opt && opt.subResources) {
			opt.subResources.forEach(function (sub) {
				if (sub.controller) {
					sub.controller.forEach(function (subController) {
						if (subController.verb.toUpperCase() === 'DELETE' || subController.verb.toUpperCase() === 'POST') {
							app[subController.verb](prefix + resource + '/:id/' + sub.name, updateCache, controller[subController.fun])
						} else
							app[subController.verb](prefix + resource + '/:id/' + sub.name, controller[subController.fun])
					})
				} else {
					var parent = sub.name.substring(0, 1).toUpperCase() + sub.name.substring(1);
					controller[FUN.PR + parent] && app.get(prefix + resource + '/:id/' + sub.name,
						controller[FUN.PR + parent]);
					controller[FUN.PC + parent] && app.post(prefix + resource + '/:id/' + sub.name, updateCache,
						controller[FUN.PC + parent]);
					controller[FUN.PU + parent] && app.post(prefix + resource + '/:id/' + sub.name + '/:sub_id',
						updateCache, controller[FUN.PU + parent]);
					controller[FUN.PD + parent] && app.delete(prefix + resource + '/:id/' + sub.name + '/:sub_id',
						updateCache, controller[FUN.PD + parent]);
				}
			})
		}
	}
};