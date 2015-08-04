var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var categoryJs = require("./control/control-category.js");

var sequelize = new Sequelize('little_giant', 'twer', 'twer', {
    host: "localhost",
    dialect:"mysql",
    port:3306
})


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
});

var Goods = sequelize.define('goods', {
    id: Sequelize.INTEGER,
    goodsName: Sequelize.STRING,
    goodsInfo: Sequelize.STRING,
    goodsPrice: Sequelize.STRING,
    goodsStandardOne: Sequelize.STRING,
    goodsStandardTwo: Sequelize.STRING,
    // goodsSales: Sequelize.INTERGER,
    goodsDetail: Sequelize.STRING,
    goodsType: Sequelize.STRING,
    goodsImg: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
})

app.get('/', function(req, res) {
    res.render('index', {});
});

app.get('/slidesPicture', function(req, res) {
    var picturePath = [];
    var pictureId = [];
    Goods.findAll().then(function(good) {
        for (var i = 0; i < good.length; i++) {
            picturePath.push(good[i].dataValues.goodsImg);
            pictureId.push(good[i].dataValues.id);
        }
    }).then(function() {
        res.send({
            status: 200,
            dataPath: picturePath,
            dataId:pictureId,
            message: 'right'
        });
    });
});

app.get("/car", function(req, res) {
    res.render("car", {});
});

app.get("/shopping-cart", function(req, res) {
    res.render("shopping-cart", {});
});


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
});

app.post('/loginSubmit', function(req, res) {
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

app.post('/registerSubmit', function(req, res) {

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

app.post("/category-info", function(req, res) {
    var resultArray = [];
    categoryJs(function(result) {
        result.forEach(function(n, i) {
            resultArray.push(n.dataValues);
        })

        res.send({
            status : 1,
            data : resultArray,
            message : ""
        });
    });
});

var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
