'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
	  return queryInterface.addColumn(
		  'edms_resend_sms',
		  'company_id',
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
