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

    user_shopping_cart.findAll({
        where : {
            id : req.body.id,
            username : req.body.username
        }
    }).then(function(data) {
        if(data.length > 0) {
            user_shopping_cart.create({
               id : req.body.id,
               username : req.body.username,
               number : req.body.number,
               name : req.body.name,
               price : req.body.price
           })
       } else {
            user_shopping_cart.update({
                number : parseInt(data[0].number) + parseInt(req.body.number)
            }, {
                where : {
                    id : req.body.id,
                    username : req.body.username
                }
            })
       }
   }).done(function() {
        res.send({
            status : 100,
            data : "",
            message : "success"
        })
        res.end();
    })
})

module.exports = router;
