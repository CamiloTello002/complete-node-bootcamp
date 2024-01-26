// methods that will come in handy
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());

// custom middleware function
app.use((req, res, next /*next can be called whatever you want*/) => {
  // it wasn't defined a route, so this will always be called
  console.log('Hello from the middleware :)');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`, 'utf-8')
);

// 2) MIDDLEWARES

const deleteTour = (req, res) => {
  // in case tour doesn't exist
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  // 204 means no content
  console.log('hey its done haha');
  res.status(204).json({ status: 'success', data: null });
};

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  console.log(newTour);
  console.log(req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    length: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  // console.log(tours.length)
  const tour = tours.find((el) => el.id === parseInt(req.params.id));
  console.log(tour);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const updateTour = (req, res) => {
  // in case tour doesn't exist
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<updated tour here...>' } });
};

const getAllUsers = (req, res) => {
  res.status(200).json(users);
};
const createUser = (req, res) => {
  res.status(200).json({
    message: 'user created :)',
  });
};
const getUser = (req, res) => {
  res.status(200).json({
    message: 'user gotten :)',
  });
};
const deleteUser = (req, res) => {
  res.status(200).json({
    message: 'user deleted :) :)',
  });
};
const updateUser = (req, res) => {
  res.status(200).json({
    message: 'user updated :)',
  });
};
// 3) ROUTES
// simpler way to define routes
app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// handles http methods on a resource
app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .delete(deleteUser)
  .patch(updateUser);

const port = 3000;

// 4) STARTS SERVER
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
