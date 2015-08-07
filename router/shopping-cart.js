var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.user;
var Goods = models.goods;

var user_shopping_cart = sequelize.define('user_shopping_cart', {
    id: Sequelize.INTEGER,
    username: Sequelize.STRING,
    number: Sequelize.INTEGER,
    name: Sequelize.STRING,
    price: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

router.get("/shopping-cart", function(req, res) {
    var username = req.cookies.name;
    var array = [];

    user_shopping_cart.findAll({where : {username : username}}).then(function(val) {
        val.forEach(function(name) {
            array.push(name.dataValues);
        })
    }).done(function() {
        res.render("shopping-cart", {
            data: array
        });
    })
})

module.exports = router;
