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

var Category = sequelize.define('category', {
    id: Sequelize.INTEGER,
    parent_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    path: Sequelize.STRING,
}, {
    freezeTableName: true,
    timestamps: false
});

router.get('/category', function(req, res) {
    var breadArray = [];
    breadArray.push("所有分类");

    if(req.query.type === "所有分类") {
        Category.findAll().then(function(object) {
            object.forEach(function(data) {
                if (data.dataValues.name === req.query.type) {
                    data.dataValues.path.split(".").forEach(function(id) {
                        object.forEach(function(data) {
                            if (data.dataValues.id == id) {
                                breadArray.push(data.dataValues.name);
                            }
                        });
                    });
                }
            });
        });
    }

    Goods.findAll().then(function(result) {
        var resultArray = result.map(function(object) {
            return object.dataValues;
        })

        res.render("category", {
            data: resultArray,
            breadArray: breadArray
        });
    });
});

module.exports = router;
