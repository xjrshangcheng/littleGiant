var express = require('express');
var router = express.Router();
var db = require('../models/index')

var Goods = db.sequelize.define('goods', {
    id: db.Sequelize.INTEGER,
    name: db.Sequelize.STRING,
    info: db.Sequelize.STRING,
    price: db.Sequelize.STRING,
    standard_one: db.Sequelize.STRING,
    standard_two: db.Sequelize.STRING,
    sales: db.Sequelize.STRING,
    detall: db.Sequelize.INTEGER,
    type: db.Sequelize.STRING,
    img: db.Sequelize.STRING,
    recommend: db.Sequelize.STRING
},{
    freezeTableName : true,
    timestamps : false
});

router.get('/', function(req, res) {
    var goods = [];
    Goods.findAll().then(function(good) {
        for (var i = 0; i < good.length; i++) {
            if (good[i].dataValues.recommend === 'true') {
                goods.push(good[i].dataValues);
            }
        }
    }).then(function() {
        res.render('index');
    });
});
module.exports = router;
