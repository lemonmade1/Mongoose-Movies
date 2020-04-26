const Flight = require('../models/movie');

const Performer = require('../models/performer');

const index = (req, res) => {
  Flight.find({}, (err, movies) => {
    res.render('movies/index', { 
      title: 'All Movies', 
      movies });
  });
}

const show = (req, res) => {
  Flight.findById(req.params.id)
    .populate('cast')
    .exec((err, movie) => {
      Performer.find({
        _id: {
          $nin: movie.cast
        }
      }, (err, performers) => {

        // console.log(performers);
        // console.log(movie);

        res.render('movies/show', {
          title: 'Flight Detail',
          movie,
          performers
        });
      }
    );
   });
}

const newFlight = (req, res) => {
  res.render('movies/new', {
    title: 'Add Flight'
  });
}

const create = (req, res) => {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const movie = new Flight(req.body);
  movie.save((err) => {
    if (err) return res.redirect('/movies/new');
  
    res.redirect(`/movies/${movie._id}`);
  });
}

// EDIT
const editMe = (req, res) => {
  Flight.findById(req.params.id, (err, editFlight) => {
    res.render('movies/edit', {
      movie: editFlight,
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
   
    res.redirect('/movies', 301)
  })
}

// DELETE
const delComment = (req, res) => {
  Flight.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/movies', 301, {
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