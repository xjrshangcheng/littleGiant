var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.user;

router.get('/', function(req, res) {
    res.render('login');
});

router.post('/', function(req, res) {
    var inputName = req.body.inputName;
    var inputPwd = req.body.inputPwd;
    var result;
    var status;

    User.findAll({
        where : {
            username : inputName
        }
    }).then(function(data) {
        data.length > 0 ? data.forEach(function(val) {
                (val.dataValues.password === inputPwd) ?
                (result = 'ok',status = 200,res.cookie('name', inputName, { expires: new Date(Date.now() + 1000*60*60*24*7)})):
                (result = 'error',status = 100)
            }) : result = 'error',status = 100;
    }).done(function() {
        res.send({
           status : status,
           data : result,
           message : ''
       })
    })
});

module.exports = router;
