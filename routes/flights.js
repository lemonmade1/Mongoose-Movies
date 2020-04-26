const express = require('express');
const router = express.Router();
const flightCTRL = require('../controllers/flights');

router.get('/', flightCTRL.index);
router.get('/new', flightCTRL.new);
router.get('/:id', flightCTRL.show);
router.post('/', flightCTRL.create);

module.exports = router;
