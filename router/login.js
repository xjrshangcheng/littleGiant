var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
var sequelize = new Sequelize('little_giant', 'twer', 'twer', {
    host: "localhost",
    dialect:"mysql",
    port:3306
})
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
