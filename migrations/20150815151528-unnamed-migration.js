'use strict';

module.exports = {
    up: function(migration, DataTypes) {
        migration.createTable(
            'order', {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                user_name: DataTypes.STRING,
                time: DataTypes.STRING,
                item_id: DataTypes.STRING,
                item_name: DataTypes.STRING,
                img: DataTypes.STRING,
                price: DataTypes.STRING,
                number: DataTypes.STRING,
                amount: DataTypes.STRING,
                status: DataTypes.STRING,
                operate_field: DataTypes.STRING

            }
        );
    },

    down: function(queryInterface, Sequelize) {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    }
};
