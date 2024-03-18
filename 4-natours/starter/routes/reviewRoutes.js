const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(reviewController.getReviews).post(
  // only logged users can write a review
  authController.protect,
  // the ones that will write a review are users
  authController.restrictTo('user'),
  reviewController.createReview,
);

module.exports = router;
