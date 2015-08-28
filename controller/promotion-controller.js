var models = require('../models');
var Goods = models.goods;
var Pro = models.promotion;
var Promotion = function() {}

Promotion.prototype.renderPromotion = function(req, res) {
    var promotionGoods = [];
    var promotionTypes = [];

    Goods.findAll().then(function(data) {
        for(var i = 0; i < data.length; i ++) {
            if(typeof(data[i].dataValues.promotion) === "number") {
                promotionGoods.push(data[i].dataValues);
            }
        }
    }).then(function() {
    Pro.findAll().then(function(data) {
        data.forEach(function(val, index) {
            promotionTypes.push(val.dataValues);
        })
        res.render("promotion", {
            promotionGoods: promotionGoods,
            promotionTypes: promotionTypes
            });
        })
    })
}

Promotion.prototype.lablePromotion = function(req, res) {
    var id = Number(req.params.promotionId);

    Goods.findAll({
        where: {
            promotion: id
        }
    }).then(function(data) {
        return data.map(function(val) {
            return val.dataValues;
        })
    }).done(function(data) {
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