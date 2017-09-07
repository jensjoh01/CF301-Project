'use strict';


const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));


// Allows the user to type in exact URL and go to that page
app.get('/', (request, response) => response.sendFile('index.html', {root: './public'}));
app.get('/about', (request, response) => response.sendFile('about.html', {root: './public'}));



app.get('/tmReq/:loc/:keyword?/:classify?/:minDate?/:maxDate?', tmTest);
app.get('/*', (request, response) => response.sendFile('index.html', {root: './public'}));



function tmTest(request, response) {
  console.log(request.params);
  (requestProxy({
    url: `https://app.ticketmaster.com/discovery/v2/events.json?size=100&city=${request.params.loc}&startDateTime=${request.params.minDate === 'null'?'':request.params.minDate + 'T13%3A46%3A00Z'}&endDateTime=${request.params.maxDate === 'null' ? '' : request.params.maxDate + 'T13%3A46%3A00Z'}&keyword=${request.params.keyword === 'null' ? '':request.params.keyword}&classificationName=${request.params.classify === 'null' ? '':request.params.classify}&apikey=${process.env.apikey}`
  }))(request, response);
}


app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
