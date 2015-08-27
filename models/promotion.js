var sequelize = require('../db-connection/connection');

module.exports = function(sequelize, DataTypes) {
    var Promotion = sequelize.define('promotion', {
        id: DataTypes.INTEGER,
        type: DataTypes.STRING,
        rule: DataTypes.STRING,
        add_time: DataTypes.DATE,
        start_time: DataTypes.DATE,
        end_time: DataTypes.DATE,
        status: DataTypes.STRING
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Promotion;
};
