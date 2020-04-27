const router = require('express').Router();
const movieCTRL = require('../controllers/movies');

router.get('/', movieCTRL.index);

router.get('/new', movieCTRL.new);

router.get('/:id', movieCTRL.show);

router.post('/', movieCTRL.create);

router.get('/:id/edit', movieCTRL.editMe)

router.put('/:id', movieCTRL.update)

router.delete("/:id", movieCTRL.delComment);


module.exports = router;
