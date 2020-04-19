const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewerSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
    appt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Viewer', viewerSchema);