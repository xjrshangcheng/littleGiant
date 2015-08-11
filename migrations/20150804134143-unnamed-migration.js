'use strict';

module.exports = {
    up: function(migration, DataTypes) {
        migration.createTable(
            'user', {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                username: DataTypes.STRING,
                password: DataTypes.STRING,
                email: DataTypes.STRING
            }
        );

        migration.createTable(
            'goods', {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: DataTypes.STRING,
                info: DataTypes.STRING,
                price: DataTypes.STRING,
                standard_one: DataTypes.STRING,
                standard_two: DataTypes.STRING,
                sales: DataTypes.STRING,
                detail: DataTypes.STRING,
                type: DataTypes.STRING,
                img: DataTypes.STRING,
                recommend: DataTypes.STRING,
                more_img: DataTypes.STRING,
                special_img: DataTypes.STRING
            }
        );

        migration.createTable(
            'cart', {
                id: DataTypes.INTEGER,
                username: DataTypes.STRING,
                number: DataTypes.INTEGER,
                name: DataTypes.STRING,
                price: DataTypes.STRING
            }
        );

        migration.createTable(
            'category', {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                parent_id: DataTypes.INTEGER,
                name: DataTypes.STRING,
                path: DataTypes.STRING
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
