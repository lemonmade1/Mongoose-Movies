const express = require('express');
const router = express.Router();

const flightCTRL = require('../controllers/freqFlyrs');

router.get('/freqFlyrs/new', flightCTRL.new);
router.post('/freqFlyrs', flightCTRL.create);
router.post('/flights/:id/freqFlyrs', flightCTRL.addToFlyr);

module.exports = router;