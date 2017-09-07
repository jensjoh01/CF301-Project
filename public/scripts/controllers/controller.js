'use strict';
console.log('hi');

Events.all = [];

Search.trigger = function(){

  $.get(`/tmReq/${newSearch.loc}/${newSearch.keyword}/${newSearch.classify}/${newSearch.minDate}/${newSearch.maxDate}`)
  .then(data => Events.all = data._embedded.events
  .map(obj => new Events(obj))).then(initMap).then(view.index).catch(console.error);
};


function Events(obj){
  this.name = obj.name;
  this.date = obj.dates.start;
  this.url = obj.url;
  this.location = obj._embedded.venues[0].location;
  this.venues = obj._embedded.venues[0].name;
  this.price = obj.priceRanges;
  this.genre = obj.classifications[0] ? obj.classifications[0] : null;
  this.image = obj.images;
}

let newSearch = {};

function Search(keyword,loc,classify,minDate,maxDate){
  this.loc = loc;
  this.keyword = keyword.length === 0 ? null : keyword;
  this.classify = classify.length === 0 ? null : classify;
  this.minDate = minDate.length === 0 ? null : minDate;
  this.maxDate = maxDate.length === 0 ? null : maxDate;

}

Search.listener = function() {
  $('#input-form').on('submit', Search.submit);
};


Search.submit = function(event) {
  event.preventDefault();
  newSearch = new Search($('#search-keyword').val(),
  $('#search-city').val(),$('#search-classify').val(),$('#search-minDate').val(),$('#search-maxDate').val());
  Search.trigger();
  $('#input-form')[0].reset();
}

Search.listener();
