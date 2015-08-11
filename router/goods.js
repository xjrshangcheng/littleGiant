var express = require('express');
var router = express.Router();
var models = require('../models');
var Goods = models.goods;
var goods = require('../service/goods');

router.get('/', function(req, res) {
    var id = req.query.id;
    goods(req,res,id);
});

module.exports = router;
