const Buyer = require('../models/buyer');

const Viewer = require('../models/viewer');

const index = (req, res) => {
  Buyer.find({}, (err, buyers) => {
    res.render('buyers/index', { 
      title: 'All Buyers',
      user: req.user, 
      buyers, 
    });
  });
}

const show = (req, res) => {
  Buyer.findById(req.params.id)
    .populate('people')
    .exec((err, buyer) => {
      Viewer.find({
        _id: {
          $nin: buyer.people
        }
      }, (err, viewers) => {

        res.render('buyers/show',  {
          title: 'Buyer Detail',
          user: req.user,
          buyer,
          viewers,
        });
      }
    );
   });
}

const newBuyer = (req, res) => {
  res.render('buyers/new', {
    title: 'Add Buyer',
    user: req.user,
  });
}

const create = (req, res) => {
  // convert viewNow's checkbox of nothing or "on" to boolean
  req.body.viewNow = !!req.body.viewNow;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const buyer = new Buyer(req.body);
  buyer.save((err) => {
    if (err) return res.redirect('/buyers/new');
    res.redirect(`/buyers/${buyer._id}`, 301, {
      user: req.user,
    });
  });
}

// EDIT
const editMe = (req, res) => {
  Buyer.findById(req.params.id, (err, editBuyer) => {
    res.render('buyers/edit', {
      buyer: editBuyer,
      title: 'Edit Me',
      user: req.user
    })
  })
}

// UPDATE
const update = (req, res) => {
  const updatedBuyer = Buyer.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, () => {
    res.redirect('/buyers', 301,  {
      user: req.user,
    })
  })
}

// DELETE
const delComment = (req, res) => {
  Buyer.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/buyers', 301, {
      user: req.user,
    });
  });
}


module.exports = {
  index,
  show,
  new: newBuyer,
  create,
  update, 
  editMe,
  delComment,
};