var express = require('express');
var router = express.Router();
var models = require('../models');
var Goods = models.goods;
var Category = models.category;

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
