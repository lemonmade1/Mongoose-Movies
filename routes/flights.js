const router = require('express').Router();
const flightsCtrl = require('../controllers/flights');

router.get('/', flightsCtrl.index);

router.get('/new', flightsCtrl.new);

router.get('/:id', flightsCtrl.show);

router.post('/', flightsCtrl.create);

router.get('/:id/edit', flightsCtrl.editMe);

router.put('/:id', flightsCtrl.update);

router.delete("/:id", flightsCtrl.delComment);


module.exports = router;
