'use strict';

$(function() {
  var gridrotator = $('#ri-grid').gridrotator({
   rows: 1,
   columns: 2
  });

  var socket = io();
  socket.on('fileAdded', function(info) {
    console.log('Received event', info);
    addNewImage(info['url']);
  });

  function addNewImage(imgPath) {
   gridrotator.newImage(imgPath);
  }

});
