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

var user_shopping_cart = sequelize.define('user_shopping_cart', {
    id: Sequelize.INTEGER,
    username: Sequelize.STRING,
    number: Sequelize.INTEGER,
    name: Sequelize.STRING,
    price: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

router.get("/shopping-cart", function(req, res) {
    var username = req.cookies.name;
    var array = [];

    user_shopping_cart.findAll({where : {username : username}}).then(function(val) {
        val.forEach(function(name) {
            array.push(name.dataValues);
        })
    }).done(function() {
        res.render("shopping-cart", {
            data: array
        });
    })
})

module.exports = router;
