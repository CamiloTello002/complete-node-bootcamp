// methods that will come in handy
const express = require('express'); // application itself
const morgan = require('morgan'); // Timestamps
const tourRouter = require('./routes/tourRoutes'); // /tour route
const userRouter = require('./routes/userRoutes'); // /user route
const AppError = require('./utils/appError'); // Error handler
const globalErrorHandler = require('./controllers/errorController'); // Global error handler

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
