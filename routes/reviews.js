const router = require('express').Router();

const reviewCTRL = require('../controllers/reviews');

router.post('/movies/:id/reviews', reviewCTRL.create);

module.exports = router;