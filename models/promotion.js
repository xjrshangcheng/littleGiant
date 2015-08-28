var sequelize = require('../db-connection/connection');

module.exports = function (sequelize, DataTypes) {
    var Promotion = sequelize.define('promotion', {
        id: {
            type:DataTypes.INTEGER,
            primaryKey: true
        },
        type: DataTypes.STRING,
        rule: DataTypes.STRING,
        add_time: DataTypes.DATE,
        start_time: DataTypes.DATE,
        end_time: DataTypes.DATE,
        status: DataTypes.STRING
    }, {
        freezeTableName: true,
        timestamps: false,
        classMethods: {
            associate: function(model) {
                Promotion.hasOne(model.goods, {
                    foreignKey: {
                        name: 'promotion'
                    }
                });
            }
        }
    });
    return Promotion;
};
