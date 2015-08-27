var models = require('../models');
var Goods = models.goods;
var Pro = models.promotion;
var Promotion = function() {}

Promotion.prototype.renderPromotion = function(req, res) {
    var promotionGoods = [];
    var promotionTypes = [];

    Goods.findAll().then(function(data) {
        for(var i = 0; i < data.length; i ++) {
            if(typeof(data[i].dataValues.promotion) === "string") {
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

module.exports = Promotion;