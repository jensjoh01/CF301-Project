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
