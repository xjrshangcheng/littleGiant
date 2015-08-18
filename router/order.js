var express = require('express');
var router = express.Router();
var order = require('../service/order');
router.get('/', function(req, res) {
    var userName = req.cookies.name;
    order.readOrder(req, res, userName);
});

router.delete('/', function(req, res) {
    var id = req.body.id;
    var userName = req.cookies.name;
});
module.exports = router;
