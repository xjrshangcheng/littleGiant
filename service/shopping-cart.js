var models = require('../models');
var Cart = models.cart;
var shoppingCart = function(req, res,userName) {
    var username = userName;
    var array = [];

    Cart.findAll({
        where: {
            username: username
        }
    }).then(function(val) {
        val.forEach(function(name) {
            array.push(name.dataValues);
        });
    }).done(function() {
        res.render("shopping-cart", {
            data: array,
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
