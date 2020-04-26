const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/flights',
  { useNewUrlParser: true, useCreateIndex: true }
);

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on('connected', () => {
  console.log(`Flights is up and running on http://localhost:4000 / Connected to MongoDB at ${db.host}:${db.port}`);
});