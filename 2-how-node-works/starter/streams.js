const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    // fs.readFile('test-file.txt', (err, data) => {
    //     if (err) console.log(err, 'something went wrong...')
    //     res.end(data)
    // })

    // solution 2
    // const readable = fs.createReadStream('testtt-file.txt')
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // })
    // readable.on('end', () => {
    //     console.log("it's done with reading :)")
    //     res.end();
    // })
    // readable.on('error', error => {
    //     res.statusCode = 500;
    //     console.log('file not found')
    //     res.end('file not found :(')
    // })
    
    // solution 3
    const readable = fs.createReadStream('test-file.txt')
    readable.pipe(res);
    // readableSource
})


server.listen(8000, '127.0.0.1', () => {
    console.log('here we go again man haha')
})