'use strict';


const view = {}
const preList = function(){
  let $list = $('#listResult');

  $list.find('ul').empty();
  // $list.show().siblings().hide();
};

const render = Handlebars.compile($('#list-template').text());

view.index = function(){
  preList();
  $('#listResult ul').append(
    Events.all
  );
}


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 47.6062, lng: -122.3321}
  });
  initMarkers(map);
}

function initMarkers(map) {
  Events.all.forEach(function(json) {
    if(json.location) {
      var marker = new google.maps.Marker({
        position: {lat: parseFloat(json.location.latitude), lng: parseFloat(json.location.longitude)},
        map: map
      });

      var infoWindow = new google.maps.InfoWindow({
        content: `<h1>Event: ${json.name}</h1> <p>Date: ${json.date.localDate}</p> <p> Venue: ${json.venues}</p> <p>Category: ${json.genre.segment.name} </p> <p>Price: ${json.price ? parseInt(json.price[0].min) + ' - ' + parseInt(json.price[0].max) : 'N/A'}`
      })

      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      })
    }
  });
}
