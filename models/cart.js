var sequelize = require('../db-connection/connection');

module.exports = function(sequelize, DataTypes) {
    var Cart = sequelize.define('cart',{
        id : DataTypes.INTEGER,
        username : DataTypes.STRING,
        number : DataTypes.INTEGER,
        name : DataTypes.STRING,
        price : DataTypes.STRING
    }, {
        freezeTableName : true,
        timestamps : false
    })
    return Cart;
}
