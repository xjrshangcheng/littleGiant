var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var jade = require('jade');
var sequelize = new Sequelize('little_giant', 'twer', 'twer', {
    host: "192.168.10.110",
        dialect:   "mysql",
        port:     3306,
});
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));
app.use(express.static("bower_components"));

var User = sequelize.define('user', {
    id: Sequelize.INTEGER,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
})

app.get('/', function(req, res) {
    res.render('index', {});
});

app.get("/car", function(req, res) {
    res.render("car", {});
})

app.get("/shoppingCart", function(req, res) {
    res.render("shoppingCart", {});
})


app.get("/category", function(req, res) {
    res.render("category");
});

app.get('/register', function(req, res) {
    res.render('register');
});


app.get('/product-details', function(req, res) {
    res.render('product-details', {});
});

app.get('/login', function(req, res) {
    res.render('login');
})

app.post('/loginSubmit', function(req, res) {
    var inputName = req.body.inputName;
    var inputPwd = req.body.inputPwd;
    console.log(req.body);
    User.findAll().then(function(e) {
        var exist = false;
        e.forEach(function(n) {
            if (n.dataValues.username === inputName && n.dataValues.password === inputPwd) {
                res.send({
                    status: 200,
                    data: 'ok'
                });
                exist = true;
            } else if (n.dataValues.username === inputName && n.dataValues.password !== inputPwd) {
                res.send({
                    status: 100,
                    data: 'pwd_error'
                });
                exist = true;

            } else if (n.dataValues.username !== inputName) {
                exist = false;
            }
        })
        if (!exist) {
            res.send({
                status: 100,
                data: 'username_error'
            })
        }
    })
})


app.post('/registerSubmit', function(req, res) {

    var inputName = req.body.inputName;
    var inputPwd = req.body.inputPwd;
    var inputEmail = req.body.inputEmail;
    console.log(req.body);
    User.create({
        username: inputName,
        password: inputPwd,
        email: inputEmail
    })
    res.send({
        status : 200,
        data : 'ok'
    });
})
var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
