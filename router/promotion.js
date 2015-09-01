var express = require('express');
var router = express.Router();
var pro = require('../controller/promotion-controller');

router.get('/', pro.renderPromotion);

router.get('/:promotionId', pro.lablePromotion)

module.exports = router;
