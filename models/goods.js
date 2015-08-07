var sequelize = require('../db-connection/connection');

module.exports = function(sequelize, DataTypes) {
    var Goods = sequelize.define('goods', {
        id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        info: DataTypes.STRING,
        price: DataTypes.STRING,
        standard_one: DataTypes.STRING,
        standard_two: DataTypes.STRING,
        sales: DataTypes.STRING,
        detail: DataTypes.INTEGER,
        type: DataTypes.STRING,
        img: DataTypes.STRING,
        recommend: DataTypes.STRING
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Goods;
}
