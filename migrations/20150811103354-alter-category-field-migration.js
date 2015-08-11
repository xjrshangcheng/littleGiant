'use strict';

module.exports = {
  up: function (migration, Sequelize) {
      migration.renameColumn('category', 'parent_id', 'level');
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
