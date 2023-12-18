const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter{
    constructor() {
        super();
    }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
    console.log("a sale has been done :3")
})

myEmitter.on('newSale', () => {
    console.log("costumer name: Juliana")
})

myEmitter.on('newSale', stock => {
    console.log(`There are now ${stock} items left in stock`)
})

myEmitter.emit('newSale', 9)

/////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
    console.log('request received');
    console.log(req.url);
    res.end('request received');
})

server.on('request', (req, res) => {
    console.log('another request haha');
})

server.listen(8000, '127.0.0.1', () => {
    console.log('were waiting for requests haha');
})