var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var db = require('../models/index');
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

var user_shopping_cart = sequelize.define('user_shopping_cart',{
    id : Sequelize.INTEGER,
    username : Sequelize.STRING,
    number : Sequelize.INTEGER,
    name : Sequelize.STRING,
    price : Sequelize.STRING
}, {
    freezeTableName : true,
    timestamps : false
})

router.get('/product-details', function(req, res) {
    res.render('product-details', {});
});

router.post("/add_user_shopping_cart",function(req,res) {
    var id = req.body.id;
    var username = req.body.username;
    var number = req.body.number;
    var name = req.body.name;
    var price = req.body.price;
    console.log(req.body);

    user_shopping_cart.create({
        id : id,
        username : username,
        number : number,
        name : name,
        price : price
    }).then(function() {
        res.end();
    })
})

module.exports = router;
