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
    detail: Sequelize.STRING,
    type: Sequelize.STRING,
    img: Sequelize.STRING,
    recommend: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

var Category = sequelize.define('category', {
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
    Category.findAll({
        where: {
            parent_id: [0,1]
        }
    }).then(function(nav) {
        var primaryClassification = nav.filter(function (item) {
            return item.parent_id === 0;
        }).map(function (item) {
            var temp = {};
            temp[item.path] = item.name;
            return temp;
        });

        var secondaryClassification = {};
        nav.filter(function (item) {
            return item.parent_id === 1;
        }).map(function (item) {
            return item.dataValues;
        }).forEach(function (item) {
            secondaryClassification[parseInt(item.path)] = secondaryClassification[parseInt(item.path)] || [];
            secondaryClassification[parseInt(item.path)].push(item.name);
        });

        console.log(primaryClassification);
        
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
