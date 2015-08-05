var express = require('express');
var router = express.Router();
var db = require('../models/index');
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
}, {
    freezeTableName: true,
    timestamps: false
});

var category = sequelize.define('category', {
    id: Sequelize.INTEGER,
    parent_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    path: Sequelize.STRING,
}, {
    freezeTableName: true,
    timestamps: false
});

router.get('/', function(req, res) {
    var navigation = {};
    var goods = {};
    category.findAll().then(function(nav) {
        var primaryClassification = [];
        var secondaryClassification = [];
        for (var i = 0; i < nav.length; i++) {
            if (nav[i].dataValues.parent_id === 0) {
                primaryClassification.push(nav[i].dataValues);
            } else if (nav[i].dataValues.parent_id === 2) {
                secondaryClassification.push(nav[i].dataValues);
            }
        }
        navigation.primaryClassification = primaryClassification;
        navigation.secondaryClassification = secondaryClassification;
    }).then(function() {
        Goods.findAll().then(function(good) {
            var roll = [];
            for (var i = 0; i < good.length; i++) {
                if (good[i].dataValues.recommend === 'roll') {
                    roll.push(good[i].dataValues);
                }
            }
            goods.roll = roll;
        }).then(function() {
            res.render('index', {
                navigation: navigation,
                goods: goods
            });
        });
    });
});
module.exports = router;
