var sequelize = require('../db-connection/connection');

module.exports = function(sequelize, DataTypes) {
    var category = sequelize.define('category', {
        id: DataTypes.INTEGER,
        parent_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        path: DataTypes.STRING,
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return category;
}
