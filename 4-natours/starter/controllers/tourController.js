// const fs = require('fs');
const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

/* Here we add some fields to the query object */
exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.deleteTour = async (req, res) => {
  try {
    const deletion = await Tour.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: 'successful',
      data: { deletion },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed!',
      message: err,
    });
  }
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllTours = async (req, res) => {
  try {
    // Execute query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limiting()
      .pagination();
    const tours = await features.query;
    console.log(tours);

    // Pagination (Camilo's method)
    // let page = 1;
    // let limit = 5;
    // if (req.query.page && req.query.limit) {
    //   page = parseInt(req.query.page);
    //   limit = parseInt(req.query.limit);
    // }
    // tours = tours.slice((page - 1) * limit, (page - 1) * limit + limit);

    // const allTours = await Tour.find()
    //   .where('difficulty')
    //   .equals('easy')
    //   .where('duration')
    //   .equals(5);
    res.status(201).json({
      status: 'successful uwu',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
  // console.log(req.requestTime);
  // res.status(200).json({
  //   status: 'success',
  //   requestedAt: req.requestTime,
  // length: tours.length,
  // data: {
  //   tours,
  // },
  // });
};

exports.getTour = async (req, res) => {
  try {
    const oneTour = await Tour.findById(req.params.id);
    res.status(201).json({
      status: 'successful uwu',
      data: {
        oneTour,
      },
    });
  } catch (err) {
    console.log(err);
  }
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.updateTour = async (req, res) => {
  try {
    const update = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      timestamps: true,
      runValidators: true,
    });
    res.status(201).json({
      status: 'successful',
      data: { update },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed!',
      message: err,
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'failed!',
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
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
      // {
      //   $sort: {
      //     startDates: 1,
      //   },
      // },
    ]);

    res.status(200).json({
      status: 'success',
      number: plan.length,
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed!',
      message: err,
    });
  }
};
