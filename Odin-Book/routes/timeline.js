var express = require('express');
var router = express.Router();

//Getting model conrollers
const timeline_controller = require('../controllers/timelineController');

/* GET home page. */
router.get('/', timeline_controller.get_post);

/* GET Create a post */
router.get('/createpost', function(req, res, next) {
  res.render('createPost');
}
);
/* POST Create a post */



module.exports = router;
