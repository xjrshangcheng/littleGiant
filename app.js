var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("bower_components"));

var index = require("./router/index");
app.get('/', index);

app.get("/shopping-cart", function(req, res) {
    res.render("shopping-cart", {});
});

var category = require('./router/category')
app.use('/', category);

var login = require('./router/login');
app.use('/',login);

var header = require('./router/header');
app.use('/',header);

var register = require('./router/register');
app.use('/',register);

var shopping_cart = require('./router/shopping-cart.js');
app.use('/',shopping_cart);

var shoppingCart = require('./router/user-shopping-cart');
app.use('/add-user-shopping-cart', shoppingCart);

// var goods = require('./router/goods');
// app.use('/goods:id',goods);


var db = require('./models/index');
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

var Goods = sequelize.define('goods', {
    id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    info: Sequelize.STRING,
    price: Sequelize.STRING,
    standard_one: Sequelize.STRING,
    standard_two: Sequelize.STRING,
    sales: Sequelize.STRING,
    detail: Sequelize.STRING,
    type: Sequelize.STRING,
    img: Sequelize.STRING,
    recommend: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

app.get('/goods', function(req, res) {
    var id = req.query.id;
    var goodsData = [];

    Goods.findAll({
        where : {
            id : id
        }
    }).then(function(data) {
        if(data[0] === undefined) {
            res.send({
                status : 400,
                data : "",
                message : "no this goods"
            })
        } else {
            data.forEach(function(val) {
                goodsData.push(val.dataValues);
            })
            res.render('goods', {
                goodsData : goodsData
            });
        }
    })
});




var error = require('./router/error');
app.use('/error',error);

var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
