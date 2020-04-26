const Flight = require('../models/flight');

const Performer = require('../models/performer');

const index = (req, res) => {
  Flight.find({}, (err, flights) => {
    res.render('flights/index', { 
      title: 'All Flights', 
      flights });
  });
}

const show = (req, res) => {
  Flight.findById(req.params.id)
    .populate('cast')
    .exec((err, flight) => {
      Performer.find({
        _id: {
          $nin: flight.cast
        }
      }, (err, performers) => {

        // console.log(performers);
        // console.log(flight);

        res.render('flights/show', {
          title: 'Flight Detail',
          flight,
          performers
        });
      }
    );
   });
}

const newFlight = (req, res) => {
  res.render('flights/new', {
    title: 'Add Flight'
  });
}

const create = (req, res) => {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const flight = new Flight(req.body);
  flight.save((err) => {
    if (err) return res.redirect('/flights/new');
  
    res.redirect(`/flights/${flight._id}`);
  });
}

// EDIT
const editMe = (req, res) => {
  Flight.findById(req.params.id, (err, editFlight) => {
    res.render('flights/edit', {
      flight: editFlight,
      title: 'Edit Me',
      user: req.user
    })
  })
}

// UPDATE
const update = (req, res) => {
  const updatedFlight = Flight.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, () => {
   
    res.redirect('/flights', 301)
  })
}

// DELETE
const delComment = (req, res) => {
  Flight.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/flights', 301, {
      user: req.user,
    });
  });
}


module.exports = {
  index,
  show,
  new: newFlight,
  create,
  update, 
  editMe,
  delComment,
};