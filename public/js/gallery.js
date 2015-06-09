'use strict';

$(function() {

  function addNewImage(imgPath) {
    gridrotator.newImage(imgPath);
    console.log("Adding new pic", imgPath);
  }

  function gridReady() {
    socket.emit('readyToUpdate', {});
  }

  var gridrotator = $('#ri-grid').gridrotator({
    rows: 4, columns: 3,
    w1024 : { rows : 4, columns : 3 },
    w768 : {rows : 3, columns : 3 },
    w480 : {rows : 3, columns : 3 },
    w320 : {rows : 2, columns : 3 },
    w240 : {rows : 2, columns : 3 },
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
    });
  });

});
