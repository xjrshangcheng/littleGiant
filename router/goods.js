var express = require('express');
var router = express.Router();
var models = require('../models');
var Goods = models.goods;

router.get('/', function(req, res) {
    var id = req.query.id;
    var goodsData = [];

    Goods.findAll({
        where : {
            id : id
        }
    }).done(function(data) {
        if(data[0] === undefined) {
            res.render('error',{})
        } else {
            data.forEach(function(val) {
                goodsData.push(val.dataValues);
            })
            res.render('goods', {
                goodsData : goodsData
            });
        }
    })
});

module.exports = router;
