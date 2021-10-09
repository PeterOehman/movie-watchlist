const express = require('express');
const app = express();

const PORT = 8080;
//using destructuring to get the dbconnection key from object db/index.js is exporting, same as doing require(/db).dbConnection
const { dbConnection } = require('./db')
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

//START OF ALL MIDDLEWARE
//below two lines sets up bodyparser middleware, now req.body is available in routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
//this is requiring or router file, you can put this at the top, we are putting it where it will be used
const genresRouter = require('./routes/genre')
//this is mounting genre on all router urls in the genresRouter file we are requiring
app.use('/genre', genresRouter)

app.get('/', (req, res) => {
  res.send('Hello :)')
});
