var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var db = require('../models/index');
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

var User = sequelize.define('user', {
    id: Sequelize.INTEGER,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/registerSubmit', function(req, res) {

    var inputName = req.body.inputName;
    var inputPwd = req.body.inputPwd;
    var inputEmail = req.body.inputEmail;
    console.log(req.body);
    User.create({
        username: inputName,
        password: inputPwd,
        email: inputEmail
    });
    res.send({
        status : 200,
        data : 'ok'
    });
})

router.post('/name', function(req, res) {
    var inputName = req.body.inputName;
    var result;
    var status;

    User.findAll().then(function(e) {
        var exist = false;
        e.forEach(function(n) {
            if(n.dataValues.username === inputName) {
                result = 'user_exist';
                exist = true;
            }
        })
        if(!exist) {
            result = 'un_exist';
            status = 100;
        }
    }).done(function() {
        res.send({
            status : status,
            data : result
        })
    });
});


router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/loginSubmit', function(req, res) {
    var inputName = req.body.inputName;
    var inputPwd = req.body.inputPwd;
    var result;
    var status;

    User.findAll().then(function(e) {
        var exist = false;
        e.forEach(function(n) {
            if(n.dataValues.username === inputName && n.dataValues.password === inputPwd) {
                result = 'ok';
                status = 200;
                exist = true;
            } else if(n.dataValues.username === inputName && n.dataValues.password !== inputPwd) {
                result = 'pwd_error';
                status = 100;
                exist = true;
            }
        });
        if(!exist) {
            result = 'username_error';
            status = 100;
        }
    }).done(function() {
        res.send({
            status : status,
            data : result
        })
    });
});

module.exports = router;
