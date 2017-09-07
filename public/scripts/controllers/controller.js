'use strict';
console.log('hi');

Events.all = [];
Events.catMusic = ['Ballads/Romantic','Blues','Chanson Francaise','Children\'s Music','Classical','Country','Dance/Electronic','Folk','Hip-Hop/Rap','Holiday','Jazz','Medieval/Renaissance','Metal','New Age','Other','Pop','R&B','Reggae','Religious','Rock','Undefined','World']
Events.catFilms = ['Action/Adventure','Animation','Arthouse','Comedy','Documentary','Drama','Family','Foreign','Miscellaneous','Music','Urban'];
Events.catSports = ['Aquatics','Athletic Races','Badminton','Bandy','Baseball','Basketball','Biathlon','Body Building','Boxing','Cricket','Curling','Cycling','Equestrian','Extreme','Floorball','Football','Golf','Gymnastics','Handball','Hockey','Ice Skating','Indoor Soccer','Lacrosse','Martial Arts','Miscellaneous','Motorsports/Racing','Netball','Rodeo','Roller Hockey','Rugby','Ski jumping','Skiing','Soccer','Squash','Surfing','Swimming','Table Tennis','Tennis','Toros','Track & Field','Volleyball','Waterpolo','Wrestling'];
Events.catArtThe = ['Children\'s Theatre','Classical','Comedy','Cultural','Dance','Espectaculo','Fashion','Fine Art','Magic & Illusion','Miscellaneous','Multimedia','Music','Opera','Performance Art','Puppetry','Spectacular','Theatre','Variety'];


Search.trigger = function(){

  $.get(`/tmReq/${newSearch.loc}/${newSearch.keyword}/${newSearch.classify}/${newSearch.minDate}/${newSearch.maxDate}`)
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
  $('#input-form').on('submit', Search.submit);
  $('#search-classify').on('change',Search.catPicker);
};

Search.catPicker = function(){
  let classDD = $('#search-classify');
  let catDD = $('#search-category');
  catDD.empty();
  catDD.append($('<option value="">Select Category</option>'))
  if(classDD.val() === 'Music'){
    Search.popCat(Events.catMusic);
  } else if(classDD.val() === 'Films'){
    Search.popCat(Events.catFilms);
  } else if(classDD.val() === 'Sports'){
    Search.popCat(Events.catSports);
  }
};

Search.popCat = function(cat){
  cat.forEach(ele => {
    let opt = $(`<option value="${ele}">${ele}</option>`);
    $('#search-category').append(opt);
  });
};



Search.submit = function(event) {
  event.preventDefault();
  // let searchCat = $('#search-category').val() === '' ? $('#search-classify').val() : $('#search-category').val();

  newSearch = new Search($('#search-keyword').val(),
  $('#search-city').val(),$('#search-classify').val(),$('#search-minDate').val(),$('#search-maxDate').val());
  Search.trigger();
  $('#input-form')[0].reset();
}

Search.listener();
