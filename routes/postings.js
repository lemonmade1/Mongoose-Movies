const express = require('express');
const router = express.Router();

const postingCTRL = require('../controllers/postings');

router.post('/flights/:id/postings', postingCTRL.create);

module.exports = router;