const express = require('express');
const router = express.Router();
const movieCTRL = require('../controllers/movies');

router.get('/', movieCTRL.index);
router.get('/new', movieCTRL.new);
router.get('/:id', movieCTRL.show);
router.post('/', movieCTRL.create);

module.exports = router;
