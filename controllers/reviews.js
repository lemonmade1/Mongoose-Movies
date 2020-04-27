const Movie = require('../models/movie');

const create = (req, res) => {
  Movie.findById(req.params.id, (err, movie) => {
    movie.reviews.push(req.body);
    movie.save((err) => {
      res.redirect(`/movies/${movie._id}`, 301);
    });
  });
}

module.exports = {
  create
};