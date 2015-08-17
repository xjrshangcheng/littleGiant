'use strict';

module.exports = {
  up: function (migration, DataTypes) {
      migration.addColumn(
          'goods',
          'remark',
          DataTypes.STRING
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
