const router = require('express').Router();
const moviesCtrl = require('../controllers/movies');

router.get('/', moviesCtrl.index);

router.get('/new', moviesCtrl.new);

router.get('/:id', moviesCtrl.show);

router.post('/', moviesCtrl.create);

router.get('/:id/edit', moviesCtrl.editMe);

router.put('/:id', moviesCtrl.update);

router.delete("/:id", moviesCtrl.delComment);


module.exports = router;
