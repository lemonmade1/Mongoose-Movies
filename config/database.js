const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(
  DATABASE_URL,
  { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useFindAndModify: false,
  }
);

const db = mongoose.connection;

db.on('connected', () => {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
