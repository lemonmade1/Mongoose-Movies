const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postingSchema = new Schema({
  content: String,
  
  rating: {
    type: Number, 
    min: 1, 
    max: 5, 
    default: 5
  }
}, {
  timestamps: true
});

const flightSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },

  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
    required: true
  },
  
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN',
    required: true
  },

  flightNum: {
    type: Number,
    min: 10,
    max: 9999,
    required: true
  },

  departs: {
    type: Number,
    default: () => {
      return new Date().getFullYear()+1;
      
    }
  },

  nowBoarding: { 
    type: Boolean, 
    default: false 
  },

  postings: [
    postingSchema
  ],

  flyer: [{
    type: Schema.Types.ObjectId,
    ref: 'FreqFlyr'
  }],                                  
}, {
  timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);