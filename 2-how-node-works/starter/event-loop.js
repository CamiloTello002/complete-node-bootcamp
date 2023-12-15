const fs = require('fs');

setTimeout(() => console.log('timer 1 finished'), 0);
setImmediate(() => console.log('immediate 1 finished'));

fs.readFile('text-file.txt', () => {
	console.log('i/o finished');
})


console.log('Hello from top level code');
