const router = require('express').Router();
const buyersCtrl = require('../controllers/buyers');

// SECURE ALL CRUD BELOW (insert between '/', and CTRL)
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('./home');
}

router.get('/', 
  // isLoggedIn,
  buyersCtrl.index
);

router.get('/new', 
  // isLoggedIn,
  buyersCtrl.new
);

router.get('/:id', 
  // isLoggedIn,
  buyersCtrl.show
);

router.post('/', 
  // isLoggedIn,
  buyersCtrl.create
);

router.get('/:id/edit', 
  // isLoggedIn,
  buyersCtrl.editMe
);

router.put('/:id', 
  // isLoggedIn,
  buyersCtrl.update
);

router.delete("/:id", 
  // isLoggedIn,
  buyersCtrl.delComment
);


module.exports = router;
