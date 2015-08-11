var sequelize = require('../db-connection/connection');

module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define('category', {
        id: DataTypes.INTEGER,
        level: DataTypes.INTEGER,
        name: DataTypes.STRING,
        path: DataTypes.STRING,
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Category;
}
