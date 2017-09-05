

'use strict';

console.log('hihi')

$.get('/test/testing').then(data => Events.all = data._embedded.events
.map(obj => new Events(obj)));



function Events(obj){
  this.name = obj.name;
  this.date = obj.dates.start;
  this.url = obj.url;
  this.location = obj._embedded.venues[0].location;
  this.venues = obj._embedded.venues[0].name;
  this.price = obj.priceRanges;
  this.genre = obj.classifications[0];

}

Events.all = [];
