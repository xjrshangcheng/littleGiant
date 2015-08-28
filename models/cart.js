module.exports = function(sequelize, DataTypes) {
    var Cart = sequelize.define('cart',{
        id : DataTypes.INTEGER,
        username : DataTypes.STRING,
        number : DataTypes.INTEGER,
        name : DataTypes.STRING,
        price : DataTypes.STRING,
        total : DataTypes.STRING,
        save_money : DataTypes.STRING,
    }, {
        freezeTableName : true,
        timestamps : false
    })
    return Cart;
}
