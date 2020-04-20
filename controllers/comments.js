const Buyer = require('../models/buyer');

module.exports = {
  create
};

function create(req, res) {
  Buyer.findById(req.params.id, function(err, buyer) {
    buyer.comments.push(req.body);
    buyer.save(function(err) {
      res.redirect(`/buyers/${buyer._id}`, 301);
    });
  });
}