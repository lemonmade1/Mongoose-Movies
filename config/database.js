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

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
