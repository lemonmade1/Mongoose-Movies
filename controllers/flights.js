const Flight = require('../models/flight');

const FreqFlyr = require('../models/freqFlyr');

const index = (req, res) => {
  Flight.find({}, (err, flights) => {
    res.render('flights/index', { 
      title: 'All Flights', 
      flights 
    });
  });
}

const show = (req, res) => {
  Flight.findById(req.params.id)
    .populate('flyer')
    .exec((err, flight) => {
      FreqFlyr.find({
        _id: {
          $nin: flight.flyer
        }
      }, (err, freqFlyrs) => {

        console.log(freqFlyrs);
        console.log(flight);

        res.render('flights/show', {
          title: 'Flight Details',
          flight,
          freqFlyrs
        });
      }
    );
   });
}

const newFlight = (req, res) => {
  res.render('flights/new', {
    title: 'Add flight'
  });
}

const create = (req, res) => {
  // convert nowBoarding's checkbox of nothing or "on" to boolean
  req.body.nowBoarding = !!req.body.nowBoarding;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  
  const flight = new Flight(req.body);
  flight.save((err) => {
    if (err) return res.redirect('/flights/new');
    console.log(flight);
    res.redirect(`/flights/${flight._id}`);
  });
}

module.exports = {
  index,
  show,
  new: newFlight,
  create
};