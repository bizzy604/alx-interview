#!/usr/bin/node
const request = require('request');
const API_URL = 'https://swapi-api.hbtn.io/api';

if (process.argv.length !== 3) {
  console.log("Usage: node 0-starwars_characters.js <movie_id>");
  process.exit(1);
}

const movieId = process.argv[2];

request(`${API_URL}/films/${movieId}/`, (err, response, body) => {
  if (err) {
    console.error("Error: Unable to connect to the Star Wars API");
    return;
  }

  if (response.statusCode !== 200) {
    console.error("Error: Movie not found");
    return;
  }

  const charactersURL = JSON.parse(body).characters;
  const charactersName = charactersURL.map(
    url => new Promise((resolve, reject) => {
      request(url, (promiseErr, _, charactersReqBody) => {
        if (promiseErr) {
          reject(`Error: Could not retrieve character data from ${url}`);
        } else {
          resolve(JSON.parse(charactersReqBody).name);
        }
      });
    })
  );

  Promise.all(charactersName)
    .then(names => console.log(names.join('\n')))
    .catch(allErr => console.error(allErr));
});
