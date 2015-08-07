var express = require('express');
var router = express.Router();
var models = require('../models');
var Cart = models.cart;

router.get("/shopping-cart", function(req, res) {
    var username = req.cookies.name;
    var array = [];

    Cart.findAll({where : {username : username}}).then(function(val) {
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
