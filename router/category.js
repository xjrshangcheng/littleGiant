var express = require('express');
var router = express.Router();
var db = require('../models/index')
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

var Goods = sequelize.define('goods', {
    id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    info: Sequelize.STRING,
    price: Sequelize.STRING,
    sales: Sequelize.STRING,
    detail: Sequelize.STRING,
    type: Sequelize.STRING,
    img: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

var category = sequelize.define('category', {
    id: Sequelize.INTEGER,
    parent_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    path: Sequelize.STRING,
}, {
    freezeTableName: true,
    timestamps: false
});

router.get('/category', function(req, res) {
    var categoryArray = [];

    category.find({
        where: {
            name: req.query.type
        }
    }).then(function(categoryObj) {
        categoryObj.dataValues.path.split(".").forEach(function(n) {
            category.find({
                where: {
                    id: n
                }
            }).then(function(categoryInfoObj) {
                categoryArray.unshift(categoryInfoObj.dataValues.name);
            });
        });
    }).done(function() {
        console.log(categoryArray);
    });


    Goods.findAll().then(function(result) {
        var resultArray = result.map(function(object) {
            return object.dataValues;
        })

        res.render("category", {
            data: resultArray
        });
    });
});

module.exports = router;
