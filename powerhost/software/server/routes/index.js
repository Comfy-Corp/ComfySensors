var express = require('express');
var router = express.Router();

var info = require('./info.js');

router.get('/api/1h', info.get1h);
router.get('/api/24h', info.get24h);
router.get('/api/7d', info.get7d);
router.get('/api/1m', info.get1m);
router.get('/api/last', info.getlast);
router.get('/api/timeSince',info.getTimeSince);

router.post('/api/info/', info.createInfo);

module.exports = router;
