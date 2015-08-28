module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('user', {
        id: DataTypes.INTEGER,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return User;
}
