// const fs = require('fs');
const multer = require('multer');
const User = require('../models/userModel');
// const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    // user-7889a-22323243.jpeg
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  // this is for testing if the uploaded file
  // is actually an image
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const filterObj = (obj, changeableFields) => {
  const updatedObj = {};
  // 1) Extract all keys sent by the user
  // 2) iterate over all keys
  Object.keys(obj).forEach((el) => {
    // 3) Add the sent field if the key field
    //    is contained in the specified array
    if (changeableFields.includes(el)) {
      updatedObj[el] = obj[el];
    }
  });
  return updatedObj;
};

exports.createUser = (req, res) => {
  res.status(500).json({
    message: 'This route is not defined! Please use /signup instead!',
  });
};
exports.getUser = factory.readOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.getAllUsers = factory.getAll(User);

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not intended for password updates. Please use /updatePassword',
        400,
      ),
    );
  }

  // 1.1) Filter out unwanted field names that are not allowed to be updated
  const changeableFields = ['email', 'name'];
  const filteredBody = filterObj(req.body, changeableFields);
  // 1.2) The name of the photo is now different
  if (req.file) filteredBody.photo = req.file.filename;
  // 2) Update user document
  // We want to ONLY update name and e-mail
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // 3) Send back the response
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.uploadUserPhoto = upload.single('photo');
