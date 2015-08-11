var express = require('express');
var router = express.Router();
var models = require('../models');
var Cart = models.cart;

router.get("/shopping-cart", function(req, res) {
    var username = req.cookies.name;
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
});

router.delete('/', function(req, res) {
    var username = req.cookies.name;
    var id = req.body.id;
    var array = [];

    Cart.destroy({
        where: {
            id: id
        }
    }).done(function() {
        Cart.findAll({
            where: {
                username: username
            }
        }).done(function() {
            res.send({
                data: 'ok',
                status: 200,
                message: ''
            });
        });
    });
});

module.exports = router;
