const express = require('express');
const router = express.Router();

const performersCtrl = require('../controllers/performers');

router.get('/performers/new', performersCtrl.new);
router.post('/performers', performersCtrl.create);
router.post('/flights/:id/performers', performersCtrl.addToCast);

module.exports = router;