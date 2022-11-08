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


//LIKE Functionality


router.post('/', timeline_controller.like_button)

router.get('/likes', function(req, res, next) {
  res.send('likes page');
})


router.post('/likes', function(req, res, next) {
  console.log(req.user)
  console.log(req.post);

  res.render('likes');
})


module.exports = router;
