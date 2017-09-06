'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));



app.get('/test/:loc', tmTest);
app.get('/*', (request, response) => response.sendFile('index.html', {root: './public'}));



function tmTest(request, response) {
  console.log(request.params.loc);
  (requestProxy({
    url: `https://app.ticketmaster.com/discovery/v2/events.json?postalCode=${request.params.loc}&apikey=ukPG2DZCA3xofnrLBEuIGHyCa49KlNA0`
  }))(request, response);
}


app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
