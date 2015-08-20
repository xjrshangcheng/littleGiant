var express = require('express');
var router = express.Router();
var order = require('../service/order');
router.get('/', function(req, res) {
    var userName = req.cookies.name;
    order.read(req, res, userName);
});

router.post('/delete', function(req, res) {
    var id = req.body.id;
    order.update(req, res, id, {operate_field: 'Y'});
});

router.post('/alterStatus', function(req, res) {
    var id = req.body.id;
    order.update(req, res, id, {status: 'Y'});
});
module.exports = router;
