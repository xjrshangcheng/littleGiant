'use strict';

module.exports = {
    up: function (migration, DataTypes) {
        migration.changeColumn(
            'goods',
            'detail',
            {
                type: DataTypes.STRING(10000)
            }
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
