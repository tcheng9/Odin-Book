var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('you are on LOGIN page')
});

module.exports = router;
