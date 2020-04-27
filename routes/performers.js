const express = require('express');
const router = express.Router();

const performerCTRL = require('../controllers/performers');

router.get('/performers/new', performerCTRL.new);
router.post('/performers', performerCTRL.create);
router.post('/movies/:id/performers', performerCTRL.addToCast);

module.exports = router;