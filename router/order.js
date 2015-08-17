var express = require('express');
var router = express.Router();
var order = require('../service/order');
router.get('/', function(req, res) {
    var userName = req.cookies.name;
    order(req, res, userName);
});

module.exports = router;
