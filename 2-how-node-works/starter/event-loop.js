const fs = require('fs');
const crypto = require('crypto');

const start =   Date.now()
console.log(process.env.UV_THREADPOOL_SIZE)

setTimeout(() => console.log('timer 1 finished'), 0);
setImmediate(() => console.log('immediate 1 finished'));

fs.readFile('text-file.txt', () => {
	console.log('i/o finished');
	console.log('---------------------------');
  setTimeout(() => console.log('timer 2 finished'), 0);
  setTimeout(() => console.log('timer 3 finished'), 3000);
  setImmediate(() => console.log('immediate 2 finished'));

  process.nextTick(() => console.log('process.nextTick already run'))

  crypto.pbkdf2('password', 'heyjude', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password encrypted')
  })
  crypto.pbkdf2('password', 'heyjude', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password encrypted')
  })
  crypto.pbkdf2('password', 'heyjude', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password encrypted')
  })
  crypto.pbkdf2('password', 'heyjude', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password encrypted')
  })
})



console.log('Hello from top level code');
