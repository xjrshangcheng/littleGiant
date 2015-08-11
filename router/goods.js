var express = require('express');
var router = express.Router();
var models = require('../models');
var Goods = models.goods;

router.get('/', function(req, res) {
    var id = req.query.id;
    var goodsData = [];
    var imgDate;
    var imgDetail;

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
                imgDate = val.dataValues.more_img === null ? [] : val.dataValues.more_img.split(" ");
                imgDetail = val.dataValues.detail_img === null ? [] : val.dataValues.detail_img.split(" ");
            })
            res.render('goods', {
                goodsData : goodsData,
                imgDate : imgDate,
                imgDetail : imgDetail
            });
        }
    })
});

module.exports = router;
