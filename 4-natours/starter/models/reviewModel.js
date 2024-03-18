const mongoose = require('mongoose');

// 1) Create the schema
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
    tour: {
      // Schema.ObjectId and Schema.Types.ObjectId
      // yield the same result
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tours',
      required: [true, 'Review must belong to a tour'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    review: {
      type: String,
      required: [true, 'Review cannot be empty'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const reviewModel = mongoose.model('review', reviewSchema);

module.exports = reviewModel;
