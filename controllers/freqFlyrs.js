const FreqFlyr = require('../models/freqFlyr');
const Flight = require('../models/flight');

const create = (req, res) => {
  const s = req.body.born;
  req.body.born = `${s.substr(5,2)} - ${s.substr(8,2)} - ${s.substr(0,4)}`;
  FreqFlyr.create(req.body, (err, freqFlyr) => {
    res.redirect('freqFlyrs/new')
  });
}

const newFreqFlyr = (req, res) => {
  FreqFlyr.find({}, (err, freqFlyrs) => {
    res.render('freqFlyrs/new', {
      title: 'Add Frequent Flyer',
      freqFlyrs
    });
  })
}

const addToFlyr = (req, res) => {
  Flight.findById(req.params.id, (err, flight) => {
    flight.flyer.push(req.body.freqFlyrId);
     flight.save((err) => {
       res.redirect(`/flights/${flight._id}`);
     });
  })
}

module.exports = {
  create,
  new: newFreqFlyr,
  addToFlyr
};