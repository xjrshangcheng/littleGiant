var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.user;
var login = require('../service/login');

router.get('/', function(req, res) {
    res.render('login');
});

router.post('/',function(req,res) {
    login(req,res);
});

module.exports = router;
