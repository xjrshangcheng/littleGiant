var models = require('../models');
var Cart = models.cart;
var Goods = models.goods;
var shoppingCart = function(req, res,userName) {
    var username = userName;
    var array = [];
    var collection = [];

    Cart.findAll({
        where: {
            username: username
        }
    }).then(function(val) {
        val.forEach(function(name) {
            collection.push(name.dataValues);
            array.push(name.dataValues.id);
        });
        Goods.findAll({
            where: {
                id:array
            }
        }).then(function(data) {
            data.forEach(function(goodsId) {
                array.forEach(function(cartId){
                    if(cartId === goodsId.dataValues.id) {
                        collection.push(goodsId.dataValues.img)
                    }
                })
            })
        })
    }).done(function() {
        res.render("shopping-cart", {
            data: collection,
            status: 200,
            message: ''
        });
    });
};

var shoppingCartDelete =  function(req, res,userName,Id) {
    var username = userName;
    var id = Id;
    var array = [];

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
    shoppingCartDelete : shoppingCartDelete,
    shoppingCart : shoppingCart

};
