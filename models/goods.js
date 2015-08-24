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
        detail: DataTypes.STRING,
        type: DataTypes.STRING,
        img: DataTypes.STRING,
        recommend: DataTypes.STRING,
        more_img: DataTypes.STRING,
        special_img: DataTypes.STRING,
        detail_img: DataTypes.STRING,
        remark: DataTypes.STRING,
        barcode: DataTypes.STRING,
        status: DataTypes.STRING,
        inventory: DataTypes.INTEGER
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Goods;
};
