var express = require('express');
var router = express.Router();
var models = require('../models');
var Goods = models.goods;
var Category = models.category;

router.get('/', function(req, res) {
    var resultGoodsArray = [];
    var resultBreadArray = [];
    var resultSunCategoryArray = [];
    var sunAllCategoryArray = [];

    resultBreadArray.push("所有分类");
    req.query.type = req.query.type || "所有分类";

    Category.findAll().then(function(categoryAllRecord) {
        var currentCategoryId;
        var currentCategoryParentId;
        var currentCategoryPath;

        categoryAllRecord.forEach(function(categoryRecordOne) {
            // 生成resultBreadArray
            if (categoryRecordOne.dataValues.name === req.query.type) {
                currentCategoryPath = categoryRecordOne.dataValues.path;
                currentCategoryPath.split(".").forEach(function(categoryId) {
                    categoryAllRecord.forEach(function(categoryRecordTwo) {
                        if (categoryRecordTwo.dataValues.id == categoryId) {
                            resultBreadArray.push(categoryRecordTwo.dataValues.name);
                        }
                    });
                });

                // 得到currentCategory信息
                currentCategoryId = categoryRecordOne.dataValues.id;
                currentCategoryParentId = categoryRecordOne.dataValues.parent_id;
            }

            // 生成resultSunCategoryArray
            if (categoryRecordOne.dataValues.path.indexOf(currentCategoryPath + ".") === 0 &&
                categoryRecordOne.dataValues.parent_id === currentCategoryParentId + 1) {
                resultSunCategoryArray.push(categoryRecordOne.dataValues.name);
            } else if (req.query.type === "所有分类" && categoryRecordOne.dataValues.parent_id === 0) {
                resultSunCategoryArray.push(categoryRecordOne.dataValues.name);
            }

            // 生成sunAllCategoryArray
            if (currentCategoryPath !== "undefined" && categoryRecordOne.dataValues.path.indexOf(currentCategoryPath) === 0) {
                sunAllCategoryArray.push(categoryRecordOne.dataValues.name);
            }
        });
    }).then(function() {
        if (req.query.type !== "所有分类") {
            Goods.findAll({
                where: {
                    type: sunAllCategoryArray
                }
            }).then(function(result) {
                resultGoodsArray = result.map(function(categoryRecord) {
                    return categoryRecord.dataValues;
                });

                res.render("category", {
                    data: resultGoodsArray,
                    breadArray: resultBreadArray,
                    sunCategory: resultSunCategoryArray
                })
            });
        } else {
            Goods.findAll().then(function(result) {
                resultGoodsArray = result.map(function(categoryRecord) {
                    return categoryRecord.dataValues;
                });
                
                res.render("category", {
                    data: resultGoodsArray,
                    breadArray: resultBreadArray,
                    sunCategory: resultSunCategoryArray
                })
            });
        }
    });
});

module.exports = router;
