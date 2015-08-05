var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var cookieParser = require('cookie-parser');
var sequelize = new Sequelize('little_giant', 'twer', 'twer', {
    host: "localhost",
    dialect:"mysql",
    port:3306
})

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("bower_components"));

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
});

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

var login = require('./router/login');
app.use('/',login);


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

var register = require('./router/register');
app.use('/',register);

var shoppingCart = require('./router/user-shopping-cart');
app.use('/', shoppingCart)

var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
