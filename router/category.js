var express = require('express');
var router = express.Router();
var models = require('../models');
var Goods = models.goods;
var Category = models.category;

var ALL_CATEGORY = "所有分类";

router.get('/', function(req, res) {
    var resultGoodsArray = [];
    var resultBreadArray = [];
    var resultSubCategories = [];
    var subAllCategoryArray = [];

    resultBreadArray.push(ALL_CATEGORY);
    req.query.type = req.query.type || ALL_CATEGORY;

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

            // 生成resultSubCategories
            if (categoryRecordOne.dataValues.path.indexOf(currentCategoryPath + ".") === 0 &&
                categoryRecordOne.dataValues.parent_id === currentCategoryParentId + 1) {
                resultSubCategories.push(categoryRecordOne.dataValues.name);
            } else if (req.query.type === ALL_CATEGORY && categoryRecordOne.dataValues.parent_id === 0) {
                resultSubCategories.push(categoryRecordOne.dataValues.name);
            }

            // 生成subAllCategoryArray
            if (currentCategoryPath !== "undefined" && categoryRecordOne.dataValues.path.indexOf(currentCategoryPath) === 0) {
                subAllCategoryArray.push(categoryRecordOne.dataValues.name);
            }
        });
    }).then(function() {
        if (req.query.type !== ALL_CATEGORY) {
            var whereObj = {
                where: {
                    type: subAllCategoryArray
                }
            };

            findGoods(res, resultGoodsArray, resultBreadArray, resultSubCategories, whereObj);
        } else {
            findGoods(res, resultGoodsArray, resultBreadArray, resultSubCategories, undefined);
        }
    });
});

function findGoods(res, resultGoodsArray, resultBreadArray, resultSubCategories, whereObj) {
    Goods.findAll(whereObj).then(function(result) {
        resultGoodsArray = result.map(function(categoryRecord) {
            return categoryRecord.dataValues;
        });

        res.render("category", {
            data: resultGoodsArray,
            breadArray: resultBreadArray,
            subCategory: resultSubCategories
        })
    });
}

module.exports = router;
