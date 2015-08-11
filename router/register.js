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
    res.redirect('login');
});

router.get('/users', function(req, res) {
    var inputName = req.body.inputName;
    var message;
    var status;

    User.findAll().then(function(element) {
        element.forEach(function(object) {
            if (object.dataValues.username === inputName) {
                message = 'user_false';
            }else {
                message = 'user_true'
            }
        })
    }).done(function() {
        res.send({
            status: '',
            data: '',
            message: message
        })
    });
});

module.exports = router;
