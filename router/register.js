var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.user;

router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register-submit', function(req, res) {

    var inputName = req.body.inputName;
    var inputPwd = req.body.inputPwd;
    var inputEmail = req.body.inputEmail;
    User.create({
        username: inputName,
        password: inputPwd,
        email: inputEmail
    });
    res.send({
        status: 200,
        data: 'ok'
    });
})

router.post('/name', function(req, res) {
    var inputName = req.body.inputName;
    var message;
    var status;

    User.findAll().then(function(e) {
        var exist = false;
        e.forEach(function(n) {
            if (n.dataValues.username === inputName) {
                message = 'user_exist';
                exist = true;
            }
        })
        if (!exist) {
            message = 'un_exist';
            status = 100;
        }
    }).done(function() {
        res.send({
            status: status,
            data: message
        })
    });
});

module.exports = router;
