const express = require('express');
const app = express();

const PORT = 8080;

const dbConnection = require('./db')
//this is the same as doing ./db/index.js, in our package.json our 'main' is index.js, so node uses this file by default
const startServer = async() => {
  await dbConnection.sync();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!~`)
  });
}
//this will wait for our database to sync(create all models we created) and THEN run the server.
//now our server has a database connection that we can use in our routes
startServer()

app.get('/', (req, res) => {
  res.send('Hello :)')
});
