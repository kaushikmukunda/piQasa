'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var multer = require('multer');
var swig = require('swig');
var Socket = require('./modules/sockets.js');
var socket = new Socket();

var index = require('./routes/index');

var app = express();

var port = process.env.PORT || 3000;
var host = process.env.VCAP_APP_HOST || "127.0.0.1";

// view engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

module.exports = app;

// Begin listening
if (require.main === module) {
  var server = app.listen(port, host, function (err) {
    if (err) {
      throw err;
    }
    console.log("Express server listening on port %s, server running on %s",
      port, host);
  });

  socket.setupConnection(server);
}
