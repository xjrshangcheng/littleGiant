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
            parent_id: [0, 1]
        }
    }).then(function(nav) {
        var navigationData = nav.map(function(item) {
            return item.dataValues;
        });

        var primaryClassification = {};
        var dataCount = 0;
        navigationData.filter(function(item) {
            return item.parent_id === 0;
        }).forEach(function(item) {
            if (dataCount < 11) {
                dataCount++;
                primaryClassification[parseInt(item.path)] = item.name;
            }
        });

        var secondaryClassification = {};
        navigationData.filter(function(item) {
            return item.parent_id === 1;
        }).forEach(function(item) {
            secondaryClassification[parseInt(item.path)] = secondaryClassification[parseInt(item.path)] || [];
            secondaryClassification[parseInt(item.path)].push(item.name);
        });

        navigation.primaryClassification = primaryClassification;
        navigation.secondaryClassification = secondaryClassification;
    }).then(function() {
        Goods.findAll({
            where: {
                recommend: ['roll', 'popular', 'new']
            }
        }).then(function(good) {
            var goodsValues = good.map(function(item) {
                return item.dataValues;
            });

            goods.roll = goodsValues.filter(function(item) {
                return item.recommend === 'roll';
            });
            goods.popular = goodsValues.filter(function(item) {
                return item.recommend === 'popular';
            });
            goods.newItem = goodsValues.filter(function(item) {
                return item.recommend === 'new';
            });
        }).then(function() {
            res.render('homepage', {
                navigation: navigation,
                goods: goods
            });
        });
    });
});
module.exports = router;
