var express = require('express');
var router = express.Router();

router.get('/quit', function(req, res) {
    res.clearCookie('name', { path: '/' });
    res.send({
        status : 100,
        data: 'quit',
        message : ''
    })
    res.end();
})

module.exports = router;
