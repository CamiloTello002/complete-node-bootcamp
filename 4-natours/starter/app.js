// methods that will come in handy
const express = require('express');
const fs = require('fs');

const app = express();

//app.get('/', (req, res) => {
//    res.status(404).json({title: "hola a todos", message: "la verdad es que Kandy Bania me gusta", app:"Natours"});
//});
//
//app.post('/', (req, res) => {
//    res.send('You can post to this endpoint...');
//});

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// first endpoint. Specifying api version is recommended
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    length: tours.length,
    data: {
      tours,
    },
  });
});

// id and x are mandatory, y is optional
app.get('/api/v1/tours/:id', (req, res) => {
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
});

// adds data to tours
app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

// deleting a resource
app.delete('/api/v1/tours/:id', (req, res) => {
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
});

const port = 3000;

// starts HTTP server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
