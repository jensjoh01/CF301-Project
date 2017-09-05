

'use strict';
var app = app || {};

$.get('/test/testing').then(data => new Events(data));


function Events(rawDataObj) {
  Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
}
