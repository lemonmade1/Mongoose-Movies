const Movie = require('../models/movie');
const Performer = require('../models/performer');

const index = (req, res) => {
  Movie.find({}, (err, movies) => {
    res.render('movies/index', { 
      title: 'All Movies', 
      user: req.user,
      movies 
    });
  });
}

// SHOW MOVIE LIST
const show = (req, res) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .exec((err, movie) => {
      Performer.find({
        _id: {
          $nin: movie.cast
        }
      }, (err, performers) => {

        res.render('movies/show', {
          title: 'Movie Detail',
          user: req.user,
          movie,
          performers,
        });
      }
    );
   });
}

// CREATE NEW MOVIE
const newMovie = (req, res) => {
  res.render('movies/new', {
    title: 'Add Movie',
    user: req.user,
  });
}

// CREATE
const create = (req, res) => {

  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const movie = new Movie(req.body);
  movie.save((err) => {
    if (err) return res.redirect('/movies/new');
  
    res.redirect(`/movies/${movie._id}`, 301, {
      user: req.user
    });
  });
}

// EDIT
const editMe = (req, res) => {
  Movie.findById(req.params.id, (err, editMovie) => {
    res.render('movies/edit', {
      movie: editMovie,
      title: 'Edit Me',
      user: req.user
    })
  })
}

// UPDATE
const update = (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, () => {
    res.redirect('/movies', 301, {
      user: req.user
    })
  })
}

// DELETE
const delComment = (req, res) => {
  Movie.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/movies', 301, {
      user: req.user,
    });
  });
}


module.exports = {
  index,
  show,
  new: newMovie,
  create,
  editMe,
  update, 
  delComment,
};
