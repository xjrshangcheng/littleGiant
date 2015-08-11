var express = require('express');
var router = express.Router();
var models = require('../models');
var Cart = models.cart;
var add = require('../service/add');

router.post("/",function(req,res) {
    add(req,res);
})

module.exports = router;
