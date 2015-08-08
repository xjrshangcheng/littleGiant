var express = require('express');
var router = express.Router();
var models = require('../models');
var Goods = models.goods;
var Category = models.category;

router.get('/', function(req, res) {
    var breadArray = [];
    var sunCategory = [];
    var sunAllCategory = [];

    breadArray.push("所有分类");
    req.query.type = req.query.type || "所有分类";

    Category.findAll().then(function(object) {
        var selectId;
        var parentId;
        var path;

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
                path = data.dataValues.path;
            }
        });

        object.forEach(function(data) {
            if (data.dataValues.path.indexOf(selectId + ".") !== -1 && data.dataValues.parent_id === parentId + 1) {
                sunCategory.push(data.dataValues.name);
            } else if (req.query.type === "所有分类" && data.dataValues.parent_id === 0) {
                sunCategory.push(data.dataValues.name);
            }
        });

        object.forEach(function(data) {
            if (path !== "undefined" && data.dataValues.path.indexOf(path) === 0) {
                sunAllCategory.push(data.dataValues.name);
            }
        });
    }).then(function() {
        if (req.query.type !== "所有分类") {
            Goods.findAll({
                where: {
                    type: sunAllCategory
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
        } else {
            Goods.findAll().then(function(result) {
                var resultArray = result.map(function(object) {
                    return object.dataValues;
                });

                res.render("category", {
                    data: resultArray,
                    breadArray: breadArray,
                    sunCategory: sunCategory
                });
            });
        }
    });
});

module.exports = router;
