

'use strict';


Events.all = [];



Search.trigger = function(){
  $.get(`/test/${newSearch.loc}`)

  .then(data => {console.log(data);Events.all = data._embedded.events
  .map(obj => new Events(obj))}).then(initMap);
}


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

function Search(keyword,loc){
  this.keyword = keyword;
  this.loc = loc;
}

Search.listener = function() {
  // $('.tab-content').show();
  // $('#export-field').hide();
  $('#input-form').on('submit', Search.submit);
};





Search.submit = function(event) {
  event.preventDefault();
  newSearch = new Search($('#search-keyword').val(),
  $('#search-postal').val());
  Search.trigger();
}

Search.listener();
