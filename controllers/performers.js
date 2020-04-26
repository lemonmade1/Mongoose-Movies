const Performer = require('../models/performer');
const Flight = require('../models/flight');

const create = (req, res) => {
  const s = req.body.born;
  req.body.born = `${s.substr(5,2)}-${s.substr(8,2)}-${s.substr(0,4)}`;
  Performer.create(req.body, (err, performer) => {
    res.redirect('performers/new')
  });
}

const newPerformer = (req, res) => {
  Performer.find({}, (err, performers) => {
    res.render('performers/new', {
      title: 'Add Performer',
      performers
    });
  })
}

const addToCast = (req, res) => {
  Flight.findById(req.params.id, (err, flight) => {
    flight.cast.push(req.body.performerId);
     flight.save((err) => {
       res.redirect(`/flights/${flight._id}`);
     });
  })
}

module.exports = {
  create,
  new: newPerformer,
  addToCast
};