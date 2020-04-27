const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.redirect('/movies');
});

module.exports = router;
