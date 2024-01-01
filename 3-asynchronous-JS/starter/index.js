const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 😢');
      resolve(data);
    });
  });
};

// function that runs in the background
const getDogPic = async () => {
    try{
    // reads contents of file
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed name: ${data}`)
    // get request with contents of file
    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(res.body.message);
    // takes the message of the response's body and saves it in a file
    await writeFilePro('dog-img.txt', res.body.message);
    console.log('random dog saved to file!!');
    // in case something fails, it'll throw an error
    } catch (err) {
        console.log(err);
        throw(err);
    }
  return '2: READY';
};
(async () => {
  try{
    console.log('step 1: get dog pics');
    console.log(await getDogPic());
    console.log('step 3: done!!!');
  } catch(err) {
    console.log('ERROR!!!');
  }
})();
/*
console.log("1: We'll get dog pics");
getDogPic()
  // in case promise is fulfilled
  .then(x => {
    console.log(x);
    console.log('3: done getting dog pics');
})
  // error handler
  .catch( err => {
    console.log('ERROR');
});
*/



/*
// dog.txt must NOT contain a newline, else it won' work
readFilePro(`${__dirname}/dog.txt`)
    .then(data => {
        console.log(`Breed: ${data}`);
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then(res => {
        console.log(res.body.message);
        return writeFilePro('dog-img.txt', res.body.message)
    })
    .then(() => {
        console.log('Random dog image saved to file :)')
    })
    .catch(err => {
        console.log(err);
    });

*/
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write file 😢');
      resolve('success');
    });
  });
};