const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  bedrooms: {
    type: Number, 
    min: 1, 
    max: 5, 
    default: 5
  }
}, {
  timestamps: true
});

const buyerSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },

  location: {
    type: String
  },

  prRange: String,

  viewNow: { 
    type: Boolean, 
    default: false 
  },

  comments: [commentSchema],

  people: [{
    type: Schema.Types.ObjectId,
    ref: 'Viewer'
  }],                                  
}, {
  timestamps: true
});

module.exports = mongoose.model('Buyer', buyerSchema);