'use strict';

var socketio = require('socket.io')();
var fileUtils = require('./fileUtils.js');

module.exports = Socket;

function Endpoint(endpoint) {
  var client = endpoint;

  client.on('readyToUpdate', function() {
    fileUtils.getUploadedPics()
    .then(function(pics) {
      client.emit('updatePics', pics);
      console.log('Sent uploaded pics!', pics);
    })
    .catch(function(err) {
      console.log(err);
    });
  });
}

function listen(socketConnection) {
  socketConnection.on('connection', function(endpoint) {
    console.log('Connection initiated');
    new Endpoint(endpoint);
  });

  socketConnection.on('disconnect', function() {
    console.log('User disconnected');
  });

}

function Socket() {};

Socket.prototype.setupConnection = function(server) {
  var socketConnection = socketio.listen(server);
  listen(socketConnection);
};

Socket.prototype.broadcastEvent = function(evt, kwargs) {
  console.log("Event is ", evt, kwargs);
  socketio.emit(evt, kwargs);
};

