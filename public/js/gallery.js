'use strict';

$(function() {

  function addNewImage(imgPath) {
   gridrotator.newImage(imgPath);
  }

  function gridReady() {
    socket.emit('readyToUpdate', {});
  }

  var gridrotator = $('#ri-grid').gridrotator({
   rows: 4, columns: 3,
   maxStep: 2,
   onInit: gridReady
  });

  var socket = io();

  socket.on('fileAdded', function(info) {
    addNewImage(info['url']);
  });

  socket.on('updatePics', function(pics) {
    pics.forEach(function(pic) {
      addNewImage(pic);
      console.log("Adding new pic", pic);
    });
  });

});
