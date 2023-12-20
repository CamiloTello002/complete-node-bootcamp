const fs = require('fs');
const superagent = require('superagent');

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

        fs.writeFile('dog-img.txt', res.body.message, err => {
            console.log('file has been saved to file :)')
        });
    });
})
*/
