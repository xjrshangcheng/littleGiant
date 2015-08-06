var express = require('express');
var router = express.Router();
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
router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login-submit', function(req, res) {
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
        // if(data.length > 0) {
        //     data.forEach(function(val) {
        //         if(val.dataValues.password === inputPwd) {
        //             result = 'ok';
        //             status = 200;
        //             // exist = true;
        //             res.cookie('name', inputName, { expires: new Date(Date.now() + 1000*60*60)});
        //         }else{
        //             result = 'error';
        //             status = 100;
        //         }
        //     })
        // }else{
        //     result = 'error';
        //     status = 100;
        // }
    }).done(function() {
        res.send({
           status : status,
           data : result,
           message : ''
       })
    })
});

module.exports = router;
