var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
<<<<<<< Updated upstream
=======
var sequelize = new Sequelize('little_giant', 'twer', 'twer', {
    host: "localhost",
    dialect:"mysql",
    port:3306
})
>>>>>>> Stashed changes

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("bower_components"));

<<<<<<< Updated upstream
=======
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
});

>>>>>>> Stashed changes
var index = require("./router/index");
app.get('/', index);

var category = require('./router/category')
app.use('/category', category);

var login = require('./router/login');
app.use('/login',login);

var header = require('./router/header');
app.use('/quit',header);

var register = require('./router/register');
app.use('/',register);

var skipped = require('./router/skipped');
app.use('/skipped',skipped);

var shoppingCart = require('./router/shopping-cart');
app.use('/shopping-cart',shoppingCart);

<<<<<<< Updated upstream
var order = require('./router/order');
app.use('/order',order);

var userShoppingCart = require('./router/add');
app.use('/add', userShoppingCart);

var pay = require('./router/pay');
app.use('/pay',pay);

var goods = require('./router/goods');
app.use('/goods',goods);

var promotion = require('./router/promotion');
app.use('/promotion', promotion);

var error = require('./router/error');
app.use('/error',error);
=======
var login = require('./router/login');
app.use('/',login);

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

var shoppingCart = require('./router/user-shopping-cart');

app.use('/', shoppingCart)
>>>>>>> Stashed changes

var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});