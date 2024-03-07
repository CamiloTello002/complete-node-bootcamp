// const fs = require('fs');
const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* Here we add some fields to the query object */
exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.deleteTour = catchAsync(async (req, res, next) => {
  const deletion = await Tour.findByIdAndDelete(req.params.id);
  // In case the tour is not found
  if (!deletion) return next(new AppError('No tour found with that ID', 404));
  res.status(201).json({
    status: 'successful',
    data: { deletion },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

exports.getAllTours = catchAsync(async (req, res, next) => {
  // Execute query
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limiting()
    .pagination();
  const tours = await features.query;

  res.status(201).json({
    status: 'successful uwu',
    results: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const oneTour = await Tour.findById(req.params.id);

  // In case the tour is not found
  if (!oneTour) return next(new AppError('No tour found with that ID', 404));

  res.status(201).json({
    status: 'successful uwu',
    data: {
      oneTour,
    },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const update = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    timestamps: true,
    runValidators: true,
  });
  // In case the tour is not found
  if (!update) return next(new AppError('No tour found with that ID', 404));
  res.status(201).json({
    status: 'successful',
    data: { update },
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const pipeline = [
    { $match: { ratingsAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numDocuments: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: {
        avgPrice: 1,
      },
    },
  ];
  const stats = await Tour.aggregate(pipeline);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = parseInt(req.params.year, 10);

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: {
        month: '$_id',
      },
    },
    {
      $project: { _id: 0 },
    },
    {
      $sort: { numTourStarts: -1 },
    },
    {
      $limit: 5,
    },
  ]);

  res.status(200).json({
    status: 'success',
    number: plan.length,
    data: {
      plan,
    },
  });
});
