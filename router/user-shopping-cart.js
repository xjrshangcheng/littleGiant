var express = require('express');
var router = express.Router();
var db = require('../models/index');
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

var UserCart = sequelize.define('user-shopping-cart',{
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

    UserCart.findAll({
        where : {
            id : req.body.id,
            username : req.body.username
        }
    }).then(function(data) {
        if(data[0] === undefined) {
            UserCart.create({
               id : req.body.id,
               username : req.body.username,
               number : req.body.number,
               name : req.body.name,
               price : req.body.price
           })
       } else {
            UserCart.update({
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
