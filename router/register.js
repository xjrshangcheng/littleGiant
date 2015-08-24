var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.user;

router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', function(req, res) {
    var inputName = req.body.uid;
    var inputPwd = req.body.psw1;
    var inputEmail = req.body.email;
    User.create({
        username: inputName,
        password: inputPwd,
        email: inputEmail
    });
    res.redirect('skipped');
});

router.get('/users', function(req, res) {
    var inputName = req.query.inputName;
    var message;
    var status;
    User.findAll({
        where: {
            username: inputName
        }
    }).then(function(data) {
        if (data.length !== 0) {
            message = 'user_false';
        }
    }).done(function() {
        res.send({
            status: '',
            data: '',
            message: message
        })
    });
});

module.exports = router;
