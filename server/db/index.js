const Sequelize = require('sequelize');

const dbConnection = new Sequelize(
  'postgres://@localhost:5432/moviewatchlist'
);

/*
  Movie model
    -title(not null)
    -imdblink(null)
    -watched (not null, boolean, default false)
  Genre model
    -name (not null)

  Many to many relationship between movies and genres
  belongsToMany, so use join table
*/
//Movie is the name of our variable to use this in our code, movie is what the name of the model will be in our database. we use movie variable for things like defining relationships (many to many one to many etc.)
const Movie = dbConnection.define('movie', {
  title: {
    //you dont need datatypes, although it is more explicit
    type: Sequelize.DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imdbLink: {
    type: Sequelize.DataTypes.STRING(1000),
    //the default is allowNull true, so by default the user doesn't have to specify this column, however writing it out makes it explicit
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  watched: {
    type: Sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

const Genre = dbConnection.define('genre', {
  name: {
    //why care about limiting a string length? it makes your database faster, if not it could expect to hold bigger values and allocate uneccesary recources to holding those values
    type: Sequelize.DataTypes.STRING(50),
    allowNull: false
  }
})

Movie.belongsToMany(Genre, { through: 'movies_genres' });
Genre.belongsToMany(Movie, { through: 'movies_genres' });
//in our through we are using a string to name the model, we can actually make another model and put that in the through as a variable so we can add more columns to that table, however we dont need that

module.exports = {
  dbConnection: dbConnection,
  Movie: Movie,
  Genre: Genre
}
/* using advanced object syntax could make this {
  dbConnection,
  Movie,
  Genre
} */
