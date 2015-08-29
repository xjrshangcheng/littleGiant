var models = require('../models');
var Cart = models.cart;
var Goods = models.goods;
var Promotion = models.promotion;
var shoppingCart = function(req, res, userName) {
    var username = userName;
    var idStore = [];
    var allInformation = [];

    Cart.findAll({
        where: {
            username: username
        }
    }).then(function(val) {
        return val.forEach(function(name) {
            allInformation.push(name.dataValues);
            idStore.push(name.dataValues.id);
        });
    }).then(function(data) {
        return Goods.findAll({
            where: {
                id: idStore
            }
        })
    }).then(function(data) {
        return data.forEach(function(goodsId, i) {
            idStore.forEach(function(cartId) {
                if (cartId === goodsId.dataValues.id) {
                    allInformation[i].img = goodsId.dataValues.img;
                }
            });
        });
    }).then(function(data) {
        return Promotion.findAll({
            where: {
                id: idStore
            }
        })
    }).then(function(data) {
        return data.forEach(function(promotion, i) {
            idStore.forEach(function(cartId) {
                if (cartId === promotion.dataValues.id) {
                    allInformation[i].type = promotion.dataValues.type;
                }
            })
        })
    }).then(function(data) {
        res.render("shopping-cart", {
            data: allInformation,
            status: 200,
            message: ''
        });
    });
};
var shoppingCartDelete = function(req, res, userName, Id) {
    var username = userName;
    var array = [];
    var id = Id;

    Cart.destroy({
        where: {
            id: id
        }
    }).done(function() {
        res.send({
            data: 'ok',
            status: 200,
            message: ''
        });
    });
};

module.exports = {
    shoppingCartDelete: shoppingCartDelete,
    shoppingCart: shoppingCart
};
