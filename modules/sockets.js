'use strict';

var socketio = require('socket.io')();

module.exports = Socket;

function Socket() {};

Socket.prototype.setupConnection = function(server) {
  var socketConnection = socketio.listen(server);
  listen(socketConnection);
};

Socket.prototype.broadcastEvent = function(evt, kwargs) {
  console.log("Event is ", evt, kwargs);
  socketio.emit(evt, kwargs);
};

function listen(socketConnection) {
  socketConnection.on('connection', function(endpoint) {
    console.log('Connection initiated');
  });

  socketConnection.on('disconnect', function(endpoint) {
    console.log('User disconnected');
  });
}
