var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('timeline');
});

/* GET Create a post */
router.get('/createpost', function(req, res, next) {
  res.render('createPost');
}
);
/* POST Create a post */



module.exports = router;
