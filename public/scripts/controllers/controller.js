'use strict';
console.log('hi');

Events.all = [];

Search.trigger = function(){

  $.get(`/test/${newSearch.loc}/${newSearch.keyword}/${newSearch.classify}/${newSearch.minDate}/${newSearch.maxDate}`)
  .then(data => Events.all = data._embedded.events
  .map(obj => new Events(obj))).then(initMap).then(view.index).catch(console.error);
};


function Events(obj){
  this.name = obj.name ? obj.name : null;
  this.date = obj.dates.start ? obj.dates.start : null;
  this.url = obj.url ? obj.url : null;
  this.location = obj._embedded.venues ? obj._embedded.venues[0].location : null;
  this.venues = obj._embedded.venues ? obj._embedded.venues[0].name : null;
  this.price = obj.priceRanges ? obj.priceRanges : null;
  this.genre = obj.classifications ? obj.classifications[0] : null;
  this.image = obj.images ? obj.images : null;
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
  // $('.tab-content').show();
  // $('#export-field').hide();
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
