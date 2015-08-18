var sequelize = require('../db-connection/connection');

module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define('user_order', {
        id: DataTypes.INTEGER,
        user_name: DataTypes.STRING,
        time: DataTypes.STRING,
        item_id: DataTypes.STRING,
        item_name: DataTypes.STRING,
        img: DataTypes.STRING,
        price: DataTypes.STRING,
        number: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        status: DataTypes.STRING,
        operate_field: DataTypes.STRING
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Order;
};
