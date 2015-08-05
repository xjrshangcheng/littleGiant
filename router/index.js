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
    standard_one: Sequelize.STRING,
    standard_two: Sequelize.STRING,
    sales: Sequelize.STRING,
    detall: Sequelize.INTEGER,
    type: Sequelize.STRING,
    img: Sequelize.STRING,
    recommend: Sequelize.STRING
},{
    freezeTableName : true,
    timestamps : false
});

router.get('/', function(req, res) {
    var goods = [];
    Goods.findAll().then(function(good) {
        for (var i = 0; i < good.length; i++) {
            if (good[i].dataValues.recommend !== 'false') {
                goods.push(good[i].dataValues);
            }
        }
    }).then(function() {
        res.render('index');
    });
});
module.exports = router;
