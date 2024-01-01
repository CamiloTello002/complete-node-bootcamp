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
    // when the promise is resolved, it'll save the value in the data variable
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed name: ${data}`)

    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('random dog saved to file!!');
    } catch (err) {
        console.log(err);
    }
}
getDogPic();

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