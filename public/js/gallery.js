'use strict';

$(function() {

  function addNewImage(imgPath) {
   gridrotator.newImage(imgPath);
  }

  var gridrotator = $('#ri-grid').gridrotator({
   rows: 2, columns: 4,
   maxStep: 2
  });

  var socket = io();

  socket.emit('readyToUpdate', {});

  socket.on('fileAdded', function(info) {
    addNewImage(info['url']);
    console.log('Received event', info);
  });

  socket.on('updatePics', function(pics) {
    pics.forEach(function(pic) {
      addNewImage(pic);
      console.log("Adding new pic", pic);
    });
  });

});
