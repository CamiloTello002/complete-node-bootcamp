const fs = require('fs');
const superagent = require('superagent');

<<<<<<< HEAD
// takes the file name as the argument
const readFilePro = file => {
  // promises take executor functions
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find the file you wanted')
      resolve(data) // any value we pass to resolve is what we'll return
    })
  })
}

readFilePro(`${__dirname}/dog.txt`)
// piece of code to be executed in case the promise was fulfilled
.then(data => {
    console.log(`Breed is: ${data}`);

    superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then( res => {
        console.log(res.body.message);
        fs.writeFile('dog-img.txt', res.body.message, err => {
          if (err) return console.log(err.message);
          console.log('Random image has been saved to file :)')
        });
    })
    .catch(err => {
        console.log(err.message);
    });
  });


/*
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    // file information is shown
    console.log(`Breed: ${data}`);

    superagent
    // this get method returns a promise
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
        if (err) return console.log(err.message)
        console.log(res.body.message)
=======
// in this case, you call readFilePro() so that
// you can make the promise
const readFilePro = file => {
    return new Promise((resolve, reject) => {
        // inside this piece of code, the resolve and reject
        // functions will be called at some point. It highly 
        // depends on the complexity of the piece of code :)

        // first of all, we'll call a function called readFile
        fs.readFile(file, (err, data) => {
            // we call the reject function as soon as there's an 
            // error when retrieving the data
            if (err) reject('sorry, file could not be read')
>>>>>>> d8e9599 (promisifying callbacks)

            // resolve will be called when the data is available :)
            resolve(data);
        });

    });
<<<<<<< HEAD
})
*/
=======

}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not write file :(')
            resolve('success.')
        })
    })
}

// the readFilePro returns a promise (a value that will be resolved in the future), 
// and it'll be stored in the myFile variable.
const myFile = readFilePro(`${__dirname}/dog.txt`)
// the then method will be executed when the promise is fulfilled.
// this then methods takes one argument; the expected value in the promise.
.then(result => {
    console.log(`Breed is: ${result}`);

    // superagent.get makes a GET request to the specified URL
    superagent
    .get(`https://dog.ceo/api/breed/${result}/images/random`)
    // and runs this piece of code when the promise is fulfilled
    .then(res => {
        console.log(res.body.message);

        // in case the promise is fulfilled, we take the message of the body and
        // save it to a file
        fs.writeFile('dog-img.txt', res.body.message, err => {
            if (err) return console.log(err.message);
            console.log('random dog saved to file!');
        })
    })
    // this will be run in case the superagent.get method doesn't fulfill the promise
    .catch(err => {
        console.log(err.message)
    })
})
>>>>>>> d8e9599 (promisifying callbacks)
