var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var post_controller = require('../controllers/postController');

/* GET Create a post */
router.get('/createpost', function(req, res, next) {
  res.render('createPost');
}
);
/* POST Create a post */

router.post('/createpost', post_controller.create_post)

module.exports = router;
