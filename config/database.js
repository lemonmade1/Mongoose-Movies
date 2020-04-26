const mongoose = require('mongoose');
// const DATABASE_URL = 'mongodb://localhost/movies';
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(
  DATABASE_URL,
  { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useFindAndModify: false,
  }
);

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on('connected', () => {
  console.log(`Flights is up and running on http://localhost:4000 / Connected to MongoDB at ${db.host}:${db.port}`);
});