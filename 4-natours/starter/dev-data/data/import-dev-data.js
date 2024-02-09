const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './../../config.env' });

// MongoDB database URI
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// Connecting to the database
mongoose.connect(DB).then((con) => {
  console.log('Successful :)');
});

// Store JSON file into a variable
const filePath = `${__dirname}/tours-simple.json`; // store path
const file = fs.readFileSync(filePath, 'utf-8'); // get the file
const fileJson = JSON.parse(file); // parse it to JSON

// Upload JSON to the model
const addTours = async () => {
  try {
    await Tour.create(fileJson);
    console.log('Data has been successfully added :)');
    console.log(`Tours added: ${fileJson.length}`);
    process.exit();
  } catch (err) {
    console.log("Data couldn't be added :(");
    console.log(err);
  }
};

// Delete all tours
const deleteTours = async () => {
  try {
    await Tour.deleteMany({});
    console.log('Data has been successfully deleted :)');
    process.exit();
  } catch (err) {
    console.log("Data couldn't be added :(");
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  addTours();
} else if (process.argv[2] === '--delete') {
  deleteTours();
}
