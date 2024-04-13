const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please user another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => new AppError(err.message, 400);

const handleJsonWebTokenError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleTokenExpiredError = () =>
  new AppError('Expired token. Please log in again!', 401);

// FUNCTIONS FOR ERRORS DEPENDING ON THE ENVIRONMENT :)
const sendErrorDev = (err, req, res) => {
  // API error
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // Website error
  return res.status(err.statusCode).render('error', {
    title: 'There was an error',
    msg: err.message,
  });
};
const sendErrorProduction = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details to the client
  } else {
    // 1) Log the error to the console xd
    console.error('Error!!!', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error.';

  // Error code will depend on the environment (development or production)
  switch (process.env.NODE_ENV) {
    case 'development':
      sendErrorDev(err, req, res);
      break;
    case 'production': {
      let error = JSON.parse(JSON.stringify(err));

      if (error.name === 'CastError') error = handleCastErrorDB(error);
      if (error.code === 11000) error = handleDuplicateFieldsDB(error);
      if (error.name === 'ValidationError')
        error = handleValidationErrorDB(error);
      if (error.name === 'JsonWebTokenError') error = handleJsonWebTokenError();
      if (error.name === 'TokenExpiredError') error = handleTokenExpiredError();

      sendErrorProduction(error, res);
      break;
    }
    default:
      sendErrorProduction(err, res);
      break;
  }
};
