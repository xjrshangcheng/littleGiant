var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('little_giant', 'twer', 'twer', {
    host: "localhost",
    dialect:"mysql",
    port:3306
})

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
    name: Sequelize.STRING,
    info: Sequelize.STRING,
    price: Sequelize.STRING,
    standard_one: Sequelize.STRING,
    standard_two: Sequelize.STRING,
    sales: Sequelize.STRING,
    detall: Sequelize.INTEGER,
    type: Sequelize.STRING,
    img: Sequelize.STRING,
    recommend: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
})

var index = require("./router/index");
app.get('/', index);

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
    Goods.findAll().then(function(e) {
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
});



app.post('/name', function(req, res) {
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




app.use('/add_user_shopping_cart', shoppingCart)
var shoppingCart = require('./router/user-shopping-cart');
app.use('/', shoppingCart)

var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
