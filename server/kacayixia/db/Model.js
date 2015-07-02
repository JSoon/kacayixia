/**
 * lonso @ 15-4-16_Sun.
 */
var uuid = require('node-uuid');
var Sequelize = require('sequelize');
var moment = require('moment');
var logger = require('../logger/logger.js').logger;
"use strict";

/**
 *
 * @param conn 数据库链接
 * @param table 表名
 * @param schema 表结构
 * @returns {*|Model}
 */
function createModel(conn, table, schema, notAdd, validation) {
	if (typeof notAdd === 'function') {
		validation = notAdd;
		notAdd = '';
	}
	if (!notAdd) {
		schema.created_at = Sequelize.INTEGER;
		schema.updated_at = Sequelize.INTEGER;
	}

	var Model = conn.define(table, schema, {
		timestamps: false,
		tableName: table,
		hooks: {
			beforeCreate: function (item, options, fn) {
				if (!item.id && (schema.id && !schema.id.Model.rawAttributes.id.autoIncrement))
					item.id = uuid.v4();
				if (typeof item.updated_at != "object" && typeof item.created_at != "object"){
					item.created_at = moment().format('X');
					item.updated_at = moment().format('X');
				}
				fn(null, item)
			},
			beforeUpdate: function (item, options, fn) {
				if (typeof item.updated_at != "object"){
					item.updated_at = moment().format('X');
				}
				fn(null, item)
			},
			beforeValidate: function (item, options, fn) {
				if (validation)
					return validation.apply(this, arguments);
				else
					fn(null, item)

			},
			beforeFind: function (item, fn) {
				if (!item.order)
					item.order = 'id desc';

				fn(null, item);
			}
		}
	});
	Model.page = function (data, pageSize) {
		pageSize = data.pageSize || pageSize || 20;
		return {
			offset: (data.pageIndex - 1) * pageSize || 0,
			limit: data.pageSize || pageSize,
			where: {}
		}
	};
	Model.logger = function (method, error, level) {
		level = level || 'error';
		logger[level]('[model:%s][method:%s]', this.name, method, error);
	};

	Model.findById = function (id) {
		return Model.find({where: {id: id}})
	};

	return Model
}


module.exports = createModel;