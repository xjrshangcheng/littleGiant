function selectSearch(Callback) {
    var result = "x";
    var Sequelize = require("sequelize");
    var sequelize = new Sequelize('little_giant', 'twer', 'twer', {
        host: "localhost",
        // 192.168.10.184
        dialect: "mysql",
        port: 3306
    });

    var Goods = sequelize.define('goods', {
        id: Sequelize.INTEGER,
        goodsName: Sequelize.STRING,
        goodsInfo: Sequelize.STRING,
        goodsPrice: Sequelize.STRING,
        goodsStandardOne: Sequelize.STRING,
        goodsstandardTwo: Sequelize.STRING,
        goodsSales: Sequelize.INTEGER,
        goodsDetail: Sequelize.STRING,
        goodsType: Sequelize.STRING,
        goodsImg: Sequelize.STRING,
    }, {
        frezeTableName: true,
        timestamps: false
    });

    Goods.findAll().then(function(e) {
        // result += e;
        Callback(e);
    });


    return result;
}

module.exports = selectSearch;
