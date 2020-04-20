const Viewer = require('../models/viewer');
const Buyer = require('../models/buyer');

const create = (req, res) => {
  const s = req.body.appt;
  req.body.appt = `${s.substr(5,2)}-${s.substr(8,2)}-${s.substr(0,4)}`;
  Viewer.create(req.body, (err, viewer) => {
    res.redirect('viewers/new', 301, {
      user: req.user,
    })
  });
}

const newViewer = (req, res) => {
  Viewer.find({}, (err, viewers) => {
    res.render('viewers/new', {
      title: 'Add Appt',
      user: req.user,
      viewers,
    });
  })
}

const addToCast = (req, res) => {
  Buyer.findById(req.params.id, (err, buyer) => {
    buyer.people.push(req.body.viewerId);
     buyer.save((err) => {
       res.redirect( 301, `/buyers/${buyer._id}`);
     });
  })
}

module.exports = {
  create,
  new: newViewer,
  addToCast
};