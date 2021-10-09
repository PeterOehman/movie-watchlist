const express = require('express')
const router = express.Router();

module.exports = router

const { Genre } = require('../db');
//GET /genre (mounted on genre in main index file)
//responds with html text to be rendered by the browser to show a form
router.get('/', (req, res) => {
  //in our form the method tells us what type of request it is, in our case a post, and then where to send it, in our case /genre
  //in our input we have name='theName', this tells us the name in our json will be connected to req.body.thename in our post request
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>Add a new genre</title></head>
      <body>
        <h1>Add new genre</h1>
        <form method='POST' action='/genre'>
          <div>
            <label>Name:</label>
            <input type='text' name='theName' />
            <button type='submit'>Add Genre</button>
          </div>
        </form>
      </body>
    </html>
  `)
})

//POST /genre
router.post('/', async (req, res, next) => {
  try {
    await Genre.create({ name: req.body.theName })
    res.redirect('/genre')
  } catch(e) {
    next(e)
  }
});
