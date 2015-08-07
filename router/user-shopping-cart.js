var express = require('express');
var router = express.Router();
var models = require('../models');
var Cart = models.cart;

router.post("/",function(req,res) {

    Cart.findAll({
        where : {
            id : req.body.id,
            username : req.body.username
        }
    }).then(function(data) {
        if(data[0] === undefined) {
            Cart.create({
               id : req.body.id,
               username : req.body.username,
               number : req.body.number,
               name : req.body.name,
               price : req.body.price
           })
       } else {
            Cart.update({
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
