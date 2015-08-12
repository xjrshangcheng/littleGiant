var express = require('express');
var router = express.Router();
var models = require('../models');
var shoppingCart = require('../service/shopping-cart');
var Cart = models.cart;

router.get("/", function(req, res) {
    var userName = req.cookies.name;

    shoppingCart.shoppingCart(req,res,userName);
});

router.delete('/', function(req, res) {
    var Id = req.body.id;
    var userName = req.cookies.name;

    shoppingCart.shoppingCartDelete(req,res,userName,Id);
});

module.exports = router;
