'use strict';

module.exports = {
  up: function (migration, DataTypes) {
    migration.createTable(
        'promotion', {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          type: DataTypes.STRING,
          rule: DataTypes.STRING,
          add_time: DataTypes.DATE,
          start_time: DataTypes.DATE,
          end_time: DataTypes.DATE,
          status: DataTypes.STRING
        }
    );

    migration.addColumn(
        'goods',
        'promotion',
        DataTypes.INTEGER
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
