var express = require('express');
var router = express.Router();
var order = require('../service/order');
router.get('/', function(req, res) {
    var userName = req.cookies.name;
    order.readOrder(req, res, userName);
});

router.post('/delete', function(req, res) {
    var id = req.body.id;
    order.alter(req, res, id, {operate_field: 'y'});
});

router.post('/alterStatus', function(req, res) {
    var id = req.body.id;
    order.alter(req, res, id, {status: 'y'});
});
module.exports = router;
