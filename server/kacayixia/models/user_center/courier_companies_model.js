/**
 * lonso @ 15-5-12_Sun.
 * lonso@foxmail.com
 */

var Sequelize = require('sequelize');
var user_center = require('../../db/mysql.js').user_center;
var Model = require('../../db/Model.js');
var helper = require('../../utils/helper.js');
var Areas = require('../../models/sudiyi_operation/areas_model.js');
var Company = require('../user_center/company_model.js');

var schema = {
	id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	name: {type: Sequelize.STRING(40)},
	brand: Sequelize.STRING(40),
	address: Sequelize.INTEGER,
                    phone_number: Sequelize.STRING(13),
                    licence: Sequelize.STRING(99),
                    licence_image: Sequelize.STRING(99),
                    legal_entity: Sequelize.STRING(20),
                    legal_entity_idcard: Sequelize.STRING(20),
                    legal_entity_idcard_front_image: Sequelize.STRING(99),
                    legal_entity_idcard_back_image: Sequelize.STRING(99),
                    balance: Sequelize.INTEGER,
                    province: Sequelize.BIGINT(20),
                    city: Sequelize.BIGINT(20),
                    district: Sequelize.BIGINT(20),
                    created_by: Sequelize.INTEGER,
                    verify: Sequelize.INTEGER(6),
                    status: Sequelize.INTEGER(6),
                    latitude: Sequelize.FLOAT,
                    longitude: Sequelize.FLOAT,
                    site_photo: Sequelize.STRING(100),
                    brand_id: Sequelize.INTEGER,
                    level: Sequelize.INTEGER,
                    staff_name: Sequelize.STRING(20),
                    staff_mobile: Sequelize.STRING(20),
                    income: Sequelize.INTEGER,
                    fee_rules_id: Sequelize.INTEGER,
                    manager_mobile: Sequelize.STRING(20)
};

var CourierCompanies = Model(user_center, 'courier_companies', schema);

module.exports = CourierCompanies;