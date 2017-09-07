'use strict';


Events.all = [];

Search.trigger = function(){

  $.get(`/test/${newSearch.loc}/${newSearch.keyword}/${newSearch.classify}`)
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
  this.genre = obj.classifications[0];

}

let newSearch = {};

function Search(keyword,loc,classify){
  this.loc = loc;

  // keyword.length === 0 ? null : this.keyword = keyword;
  // classify.length === 0 ? null : this.classify = classify;

  this.keyword = keyword.length === 0 ? null : keyword;
  this.classify = classify.length === 0 ? null : classify;
}

Search.listener = function() {
  // $('.tab-content').show();
  // $('#export-field').hide();
  $('#input-form').on('submit', Search.submit);
};



Search.submit = function(event) {
  event.preventDefault();
  newSearch = new Search($('#search-keyword').val(),
  $('#search-city').val(),$('#search-classify').val());
  Search.trigger();
  $('#input-form')[0].reset();
}

Search.listener();
