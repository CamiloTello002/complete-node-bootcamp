// methods that will come in handy
const app = require('express')();

app.get('/', (req, res) => {
    res.status(404).json({title: "hola a todos", message: "la verdad es que Kandy Bania me gusta", app:"Natours"});
});

app.post('/', (req, res) => {
    res.send('You can post to this endpoint...');
});

const port = 3000;

// starts HTTP server
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});