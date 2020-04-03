const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/movies',
  { useNewUrlParser: true, useCreateIndex: true }
);

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Up and running on http://localhost:3000,  Connected to MongoDB at ${db.host}:${db.port}`);
});