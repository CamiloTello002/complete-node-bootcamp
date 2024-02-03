const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const { Double, Decimal128 } = require('mongodb');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((con) => {
  console.log('Successful :)');
});

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  price: { type: Number, required: [true, 'A tour must have a price'] },
  rating: { type: Number, default: 4.5 },
});

const TourModel = mongoose.model('tours', toursSchema);

const testTour = new TourModel({
  name: 'Parinacochas con Raimondi',
  price: 258,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });

// const tourcreated = new TourModel({ name: 'the blinding light' });

const port = process.env.PORT || 3000;
// 3) STARTS SERVER now
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
