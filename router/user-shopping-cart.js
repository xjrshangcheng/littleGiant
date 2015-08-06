var express = require('express');
var router = express.Router();
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

router.post("/",function(req,res) {
    user_shopping_cart.create({
        id : req.body.id,
        username : req.body.username,
        number : req.body.number,
        name : req.body.name,
        price : req.body.price
    }).then(function() {
        res.send({
            status : 100,
            data : "",
            message : "success"
        })
        res.end();
    })
})

module.exports = router;
