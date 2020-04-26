require('./config/database');
const Flight = require('./models/flight');
const FreqFlyr = require('./models/freqFlyr');
const data = require('./data');

const fPromise = Flight.deleteMany({});
const pPromise = FreqFlyr.deleteMany({});

Promise.all([fPromise, pPromise]).then(() => {
  console.log(`Everything Deleted!`);

  return Promise.all([
    FreqFlyr.create(data.freqFlyrs),
    Flight.create(data.flights)
  ]);
}).then((result) => {
  console.log(`Flights and FreqFlyrs are created!`);

  return Promise.all([
    FreqFlyr.findOne({
      name: 'Mark Hamill'
    }),
    Flight.findOne({
      fullName: ''
    })
  ]);
}).then((result) => {

  mark = result[0];
  sw = result[1];
  sw.flyer.push(mark);
  return sw.save()
}).then(() => {
  process.exit();
});
