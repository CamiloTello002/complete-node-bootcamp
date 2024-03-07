const fs = require('fs');
const User = require('../models/userModel');
// const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, 'utf-8'),
// );

exports.getAllUsers = catchAsync(async (req, res) => {
  //res.status(200).json(users);
  const users = await User.find();

  res.status(201).json({
    status: 'successful uwu',
    results: users.length,
    data: {
      users,
    },
  });
});
exports.createUser = (req, res) => {
  res.status(200).json({
    message: 'user created :)',
  });
};
exports.getUser = (req, res) => {
  res.status(200).json({
    message: 'user gotten :)',
  });
};
exports.deleteUser = (req, res) => {
  res.status(200).json({
    message: 'user deleted :) :)',
  });
};
exports.updateUser = (req, res) => {
  res.status(200).json({
    message: 'user updated :)',
  });
};

// hola a todos chicos, que tal?
