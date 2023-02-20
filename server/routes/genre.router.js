const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const query = `SELECT * FROM genres ORDER BY "name" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.get('/:id', (req, res) => {
  console.log('req.params.id:', req.params.id);
  // query to join relations between genres and movies
  const queryText = `SELECT "genres"."name" FROM "genres"
  JOIN "movies_genres" ON "genres"."id" = "movies_genres"."genre_id"
  JOIN "movies" ON "movies_genres"."movie_id" = "movies"."id"
  WHERE "movies"."id" = $1;`;
  pool.query(queryText, [req.params.id])
  .then((response) => {
    console.log('response.rows:', response.rows);
    res.send(response.rows);
  }).catch((error) => {
    console.log('error in genre.router GET request', error);
    res.sendStatus(500);
  });
});


module.exports = router;

