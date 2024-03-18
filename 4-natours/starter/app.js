// methods that will come in handy
const hpp = require('hpp');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const express = require('express'); // application itself
const morgan = require('morgan'); // Timestamps

// ROUTES
const tourRouter = require('./routes/tourRoutes'); // /tour route
const userRouter = require('./routes/userRoutes'); // /user route
const reviewRouter = require('./routes/reviewRoutes');

const AppError = require('./utils/appError'); // Error handler
const globalErrorHandler = require('./controllers/errorController'); // Global error handler

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  // This limit can also be a function, which means
  // that the limit can change according to WHO is making the
  // request.
  limit: 100,
  message: 'Request limit reached.',
  legacyHeaders: false,
  requestPropertyName: 'failed',
  handler: (req, res, next, options) => {
    // perform some action here.
    console.log('someone tried to access it way too much.');
    res.status(options.statusCode).send(options.message);
  },
});
// If not in production, then allow http. Otherwise, ONLY https
const helmetOptions = {
  contentSecurityPolicy: process.env.NODE_ENV === 'production',
};

// 1) GLOBAL MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Add security http headers
app.use(helmet(helmetOptions));

// Limit the amount of requests
app.use('/api', limiter);

// Body parser
app.use(express.json({ limit: '10kb' }));

// Data sanitization (after body parser, it's when we've already read the data)
// Against NoSQL query injection

// Against XSS

// Serving static files
app.use(express.static(`${__dirname}/public`));

// protected against http parameter pollution
app.use(hpp());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES
// main route
app.get('/', (req, res) => {
  res.status(200).json({ alive: 'True' });
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
// In case a route isn't found
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
