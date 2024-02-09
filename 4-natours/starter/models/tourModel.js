const mongoose = require('mongoose');
const slugify = require('slugify');

const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } };

const toursSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'tour should have a difficulty'],
    },
    price: { type: Number, required: [true, 'A tour must have a price'] },
    ratingsAverage: { type: Number, default: 4.5 },
    ratingsQuantity: { type: Number, default: 0 },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary!'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have an image cover!!!'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  opts,
);

toursSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Document middleware: runs before .save() and .create()
toursSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

toursSchema.pre('save', function (next) {
  console.log('Will save document...');
  next();
});

toursSchema.post('save', function (doc, next) {
  console.log(doc);
  next();
});
const TourModel = mongoose.model('tours', toursSchema);

module.exports = TourModel;
