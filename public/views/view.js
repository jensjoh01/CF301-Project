'use strict';

var Events = {}
Events.all = [];

$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/events.json?city=Seattle&apikey=Po1JusEraIWYM2uF8yXnlvYFsYLAI7V1",
  async:true,
  dataType: "json",
  success: function(json) {
              // console.log(json);
              // Parse the response.
              // Do other things.
              json._embedded.events.forEach(data => Events.all.push(data))
              console.log(Events.all[0]._embedded.venues[0].name)
              initMap();
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 47.6062, lng: -122.3321}
  });
  initMarkers(map);
}

function initMarkers(map) {
  var marker = Events.all.forEach(function(val,index,array) {
    new google.maps.Marker({
    position: {lat: parseFloat(val._embedded.venues[0].location.latitude), lng: parseFloat(val._embedded.venues[0].location.longitude)},
    map: map
  });
});

  var contentString = '<div id="content">' +
  '<p>Tori Amos</p>' +
  '</div>';

  // var infowindow = new google.maps.InfoWindow({content: contentString});
  // // console.log(marker);
  // marker.addListener('click', function(){
  //   // console.log('hello?')
  //   infowindow.open(map, marker);
  // });
}
