var models = require('../models');
var Goods = models.goods;
var Pro = models.promotion;
var Promotion = function () {}

Promotion.renderPromotion = function (req, res) {
    var promotionGoods = [];
    var promotionTypes = [];
    var pageSize = 10;
    var pageCount;
    var currentPage = 0;

    Goods.findAll({
        where: {
            promotion: {
                gt: 0
            }
        },
        limit: [0, pageSize]
    }).then(function (data) {
        return data.forEach(function (val) {
            promotionGoods.push(val.dataValues);
        })
    }).then(function () {
        return Pro.findAll().then(function (data) {
            data.forEach(function (val, index) {
                promotionTypes.push(val.dataValues);
            })
        })
    }).then(function() {
        return Goods.count({
            where: {
                promotion: {
                    gt: 0
                }
            }
        }).then(function (val) {
            pageCount = Math.ceil(val/pageSize);
        })
    }).then(function () {
        res.render("promotion", {
            promotionGoods: promotionGoods,
            promotionTypes: promotionTypes,
            pageCount: pageCount
        });
    })
    console.log(promotionGoods);
}

Promotion.lablePromotion = function (req, res) {
    var id = Number(req.params.promotionId);

    Goods.findAll({
        where: {
            promotion: id
        }
    }).then(function (data) {
        return data.map(function (val) {
            return val.dataValues;
        })
    }).done(function (data) {
        res.send({
            status: 200,
            data: data
        })
    })
}


module.exports = Promotion;

//Goods.findAll({
//    where : {
//        id : 1
//    },
//    include:[
//        {model: Goods,
//         where : {id : 1}
//        }
//    ]
//}).then(function(data) {
//    console.log(data);
//    res.render('promotion');
//})