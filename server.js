'use strict';


const fs = require('fs');
const express = require('express');
const jquery = require('jquery');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();

let callRes;
let resList;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));



app.get('/test/*', tmTest);
app.get('/*', (request, response) => response.sendFile('index.html', {root: './public'}));

// app.get('/*',function(req,res){
//   res.sendFile('index.html',{root:'./public'});
//
// })

function tmTest(request, response) {
  (requestProxy({
    url: 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&postalCode=98109&apikey=ukPG2DZCA3xofnrLBEuIGHyCa49KlNA0',
  }))(request, response);
}


app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
