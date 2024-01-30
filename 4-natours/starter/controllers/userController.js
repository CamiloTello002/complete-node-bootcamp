const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, 'utf-8')
);

exports.getAllUsers = (req, res) => {
  res.status(200).json(users);
};
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
