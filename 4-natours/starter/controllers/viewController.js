const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  // 1) Get tour data from our collection
  const tours = await Tour.find();

  // 2) Build template

  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});
exports.getTour = catchAsync(async (req, res) => {
  // 1) Get the data
  const tour = await Tour.findOne({ slug: req.params.tourSlug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.login = (req, res) => {
  // Keep in mind that any data you retrieve MUST
  // be done here :)
  res.status(200).render('login', {
    title: 'login',
  });
};
