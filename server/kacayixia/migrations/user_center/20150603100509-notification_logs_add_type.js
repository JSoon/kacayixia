'use strict';
var Sequelize = require('sequelize');
module.exports = {
  up: function (queryInterface, Sequelize) {
	  return queryInterface.addColumn(
		  'notification_logs',
		  'type',
		  Sequelize.INTEGER
	  )
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
