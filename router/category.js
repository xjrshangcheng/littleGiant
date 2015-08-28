var express = require('express');
var router = express.Router();
var models = require('../models');
var Goods = models.goods;
var Category = models.category;
var currentPage = 0;
var pageSize = 8;
var subAllCategory = [];

router.get('/', function(req, res) {
    res.render("error");
})

function parameterVerify(req, res) {
    Category.find({
        where: {
            name: req.params.type
        }
    }).then(function(value) {
        if(value === null) {
            res.render("error");
        }
    });
}

router.get('/:type', function(req, res) {
    parameterVerify(req, res);
    var breadcrumbs = [];
    var subCategories = [];
    var count = 3;

    currentPage = 0;
    subAllCategory = [];
    req.params.type = req.params.type || "所有分类";

    getBreadcrumbs(req, function(data) {
        breadcrumbs.push("所有分类");
        data.forEach(function(n) {
            breadcrumbs.push(n);
        });
        count--;
        if (count === 0) {
            getPageCount(subAllCategory, pageSize, function(pageCount) {
                getGoodsAndResponse(subAllCategory, breadcrumbs, subCategories, pageCount, res);
            });
        }
    });

    getSubCategories(req, function(data) {
        subCategories = data;
        count--;
        if (count === 0) {
            getPageCount(subAllCategory, pageSize, function(pageCount) {
                getGoodsAndResponse(subAllCategory, breadcrumbs, subCategories, pageCount, res);
            });
        }
    });

    getSubAllCategories(req, function(data) {
        subAllCategory = data;
        count--;
        if (count === 0) {
            getPageCount(subAllCategory, pageSize, function(pageCount) {
                getGoodsAndResponse(subAllCategory, breadcrumbs, subCategories, pageCount, res);
            });
        }
    });
});

router.get('/:type/previousPage', function(req, res) {
    currentPage = req.query.currentPage - 2;
    getGoodsInfo(subAllCategory, function(data) {
        currentPage++;
        res.send({
            data: data,
            currentPage: currentPage
        })
    });
});

router.get('/:type/nextPage', function(req, res) {
    currentPage = req.query.currentPage;
    getGoodsInfo(subAllCategory, function(data) {
        currentPage++;
        res.send({
            data: data,
            currentPage: currentPage
        })
    });
});

function getPageCount(subAllCategory, pageSize, setPageCount) {
    Goods.count({
        where: {
            type: subAllCategory
        }
    }).then(function(pageCount) {
        setPageCount(Math.ceil(pageCount / pageSize));
    });
}

function getGoodsAndResponse(subAllCategory, breadcrumbs, subCategories, pageCount, res) {
    getGoodsInfo(subAllCategory, function(data) {
        if (data.length > 0) {
            currentPage++;
        }
        res.render("category", {
            data: data,
            breadcrumbs: breadcrumbs,
            subCategory: subCategories,
            pageCount: pageCount,
            currentPage: currentPage
        })
    });
}

function getGoodsInfo(subAllCategory, setGoodsInfo) {
    Goods.findAll({
        where: {
            type: subAllCategory
        },
        limit: [currentPage * pageSize, pageSize]
    }).then(function(result) {
        resultGoods = result.map(function(categoryRecord) {
            return categoryRecord.dataValues;
        });

        setGoodsInfo(resultGoods);
    });
}

function getSubAllCategories(req, setSubAllCategory) {
    var subAllCategory = [];
    Category.find({
        where: {
            name: req.params.type
        }
    }).then(function(resultCurrentCategory) {
        Category.findAll({
            where: {
                path: {
                    $like: resultCurrentCategory.dataValues.path + "%"
                }
            }
        }).then(function(resultCategory) {
            resultCategory.forEach(function(data) {
                subAllCategory.push(data.dataValues.name);
            });
            setSubAllCategory(subAllCategory);
        });
    });
}

function getSubCategories(req, setSubCategory) {
    var resultSubCategories = [];

    Category.find({
        where: {
            name: req.params.type
        }
    }).then(function(resultCurrentCategory) {
        Category.findAll({
            where: {
                path: {
                    $like: resultCurrentCategory.dataValues.path + "%"
                },
                level: parseInt(resultCurrentCategory.dataValues.level) + 1
            }
        }).then(function(resultCategory) {
            resultCategory.forEach(function(data) {
                resultSubCategories.push(data.dataValues.name);
            });
            setSubCategory(resultSubCategories);
        });
    });
}

function getBreadcrumbs(req, setBreadcrumbs) {
    var breadcrumbs = [];
    Category.find({
        where: {
            name: req.params.type
        }
    }).then(function(resultCurrentCategory) {
        if (resultCurrentCategory !== null) {
            Category.findAll({
                where: {
                    id: resultCurrentCategory.dataValues.path.split(".")
                }
            }).then(function(resultCategoryIds) {
                resultCategoryIds.forEach(function(resultCategory) {
                    breadcrumbs.push(resultCategory.dataValues.name);
                });
                setBreadcrumbs(breadcrumbs);
            });
        }
    });
}

module.exports = router;
