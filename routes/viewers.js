const express = require('express');
const router = express.Router();


const viewersCtrl = require('../controllers/viewers');

router.get('/viewers/new', viewersCtrl.new);
router.post('/viewers', viewersCtrl.create);
router.post('/buyers/:id/viewers', viewersCtrl.addToCast);

module.exports = router;