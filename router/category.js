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
    var sunCategory = [];

        Category.findAll().then(function(object) {
            var selectId;
            var parentId;
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

                if (data.dataValues.name === req.query.type) {
                    selectId = data.dataValues.id;
                    parentId = data.dataValues.parent_id;
                }
            });

            object.forEach(function(data) {
                if (data.dataValues.path.indexOf(selectId + ".") !== -1 && data.dataValues.parent_id === parentId + 1) {
                    sunCategory.push(data.dataValues.name);
                }else if(req.query.type === "所有分类" && data.dataValues.parent_id === 0){
                    sunCategory.push(data.dataValues.name);
                    console.log(data.dataValues.name);
                }
            })
        });

    Goods.findAll().then(function(result) {
        var resultArray = result.map(function(object) {
            return object.dataValues;
        })

        res.render("category", {
            data: resultArray,
            breadArray: breadArray,
            sunCategory: sunCategory
        });
    });
});

module.exports = router;
