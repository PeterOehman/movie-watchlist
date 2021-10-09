const dbConnection = require('./index')

const runSeed = async() => {
  await dbConnection.sync({ force: true });
  console.log('seed is comple!')
  //says to start running once the function gets to this line, you have to give a number to this, the status code of why its being killed
  process.kill(0);
}
    //when you do start and test, you can just do npm start and npm test, but anything else you need to do run, so npm run seed
runSeed();
