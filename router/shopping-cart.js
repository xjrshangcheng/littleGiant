var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.user;
var Goods = models.goods;
var db = require('../models/index');
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

var UserShoppingCart = sequelize.define('user-shopping-cart', {
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

    UserShoppingCart.findAll({where : {username : username}}).then(function(val) {
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
