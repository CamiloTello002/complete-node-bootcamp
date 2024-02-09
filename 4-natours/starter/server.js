const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((con) => {
  console.log('Successful :)');
});

// const tourcreated = new TourModel({ name: 'the blinding light' });

const port = process.env.PORT || 3000;
// 3) STARTS SERVER now
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
