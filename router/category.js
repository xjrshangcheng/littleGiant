var express = require('express');
var router = express.Router();
var models = require('../models');
var Goods = models.goods;
var Category = models.category;

router.get('/', function(req, res) {
    var breadArray = [];
    var sunCategory = [];

    breadArray.push("所有分类");
    req.query.type = req.query.type || "所有分类";

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
            } else if (req.query.type === "所有分类" && data.dataValues.parent_id === 0) {
                sunCategory.push(data.dataValues.name);
            }
        });
    });

    Goods.findAll({
        where: {
            type: req.query.type
        }
    }).then(function(result) {
        var resultArray = result.map(function(object) {
            return object.dataValues;
        });

        res.render("category", {
            data: resultArray,
            breadArray: breadArray,
            sunCategory: sunCategory
        });
    });
});

module.exports = router;
