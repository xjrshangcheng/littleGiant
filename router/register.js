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

router.post('/register-submit', function(req, res) {

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
    var message;
    var status;

    User.findAll().then(function(e) {
        var exist = false;
        e.forEach(function(n) {
            if(n.dataValues.username === inputName) {
                message = 'user_exist';
                exist = true;
            }
        })
        if(!exist) {
            message = 'un_exist';
            status = 100;
        }
    }).done(function() {
        res.send({
            status : status,
            data : message
        })
    });
});

module.exports = router;
