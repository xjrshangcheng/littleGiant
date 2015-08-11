var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.user;
var login = require('../service/login');

router.get('/', function(req, res) {
    res.render('login');
});

router.post('/',function(req,res) {
    var inputName = req.body.inputName;
    var inputPwd = req.body.inputPwd;
    login(req,res,inputName,inputPwd);
});

module.exports = router;
