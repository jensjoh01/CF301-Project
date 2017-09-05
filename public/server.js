'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const jquery = require('jquery');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = 'postgres://postgres:postgres@localhost:5432/killovolt';
const client = new pg.Client(conString);
let callRes;
let resList;

client.connect();
client.on('error', err => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));




app.get('/test/*', tmTest);

function tmTest(request, response) {
  (requestProxy({
    url: 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&postalCode=98109&apikey=ukPG2DZCA3xofnrLBEuIGHyCa49KlNA0',
  }))(request, response);
}


app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
