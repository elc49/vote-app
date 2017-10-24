var router = require('express').Router();

//Home route
router.get('/', function (req, res) {
  res.send('Home route');
});

module.exports = router;