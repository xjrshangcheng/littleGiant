var express = require('express');
var router = express.Router();
var db = require('../models/index')
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

var Goods = sequelize.define('goods', {
    id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    info: Sequelize.STRING,
    price: Sequelize.STRING,
    sales: Sequelize.STRING,
    detail: Sequelize.STRING,
    type: Sequelize.STRING,
    img: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

router.get('/category', function(req, res) {
    Goods.findAll().then(function(result) {
        var resultArray = result.map(function(object) {
            return object.dataValues;
        })

        console.log(resultArray);

        res.render("category", {
            data: resultArray
        });
    });
});

module.exports = router;
