const Performer = require('../models/performer');
const Movie = require('../models/movie');

const create = (req, res) => {
  const s = req.body.born;
  req.body.born = `${s.substr(5,2)}-${s.substr(8,2)}-${s.substr(0,4)}`;
  Performer.create(req.body, (err, performer) => {
    res.redirect('performers/new', 301, {
      user: req.user,
    })
  });
}

const newPerformer = (req, res) => {
  Performer.find({}, (err, performers) => {
    res.render('performers/new', {
      title: 'Add Performer',
      performers,
      user: req.user,
    });
  })
}

const addToCast = (req, res) => {
  Movie.findById(req.params.id, (err, movie) => {
    movie.cast.push(req.body.performerId);
     movie.save((err) => {
       res.redirect(301, `/movies/${movie._id}`);
     });
  })
}

module.exports = {
  create,
  new: newPerformer,
  addToCast
};