'use strict';

var fs = require('fs');
var Promise = require('bluebird');
var path = require('path');
var multer = require('multer');
var uuid = require('uuid');
var Socket = require('./sockets.js');
var socket = new Socket();

var STOCK_PICS_FOLDER = 'stock';
var STOCK_PICS_PATH = 'public' + path.sep + STOCK_PICS_FOLDER;
var UPLOADED_PICS_FOLDER = 'uploads';
var UPLOADED_PICS_PATH = 'public' + path.sep + UPLOADED_PICS_FOLDER;
var API_KEY = '26310805d2f3e84c5a7cfea24aaca0897e8e958244f551e812f8dc5d353e3501';

var exports = module.exports = {};

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function imagePic(fileName) {
  return (endsWith(fileName, '.jpg') ||
          endsWith(fileName, '.jpeg') ||
          endsWith(fileName, '.bmp') ||
          endsWith(fileName, '.png')
         );
}

function filterImagePics(fileList, folder) {
    var stockPics = [];
    fileList.forEach(function(file) {
      if (imagePic(file)) {
        stockPics.push(folder + path.sep + file);
      }
    });
    console.log('stockPics', stockPics);
    return stockPics;
}

function getPicsFromFolder(folder, folderPath) {
  return new Promise(function(resolve, reject) {
    fs.readdir(folderPath, function(err, files) {
      if (err) {
        reject(err);
      } else {
        resolve(filterImagePics(files, folder));
      }
    });
  });
}

function multerUpload(req, res, next) {
  var handler = multer({
    dest    : './public/uploads/',
    rename  : function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + uuid.v4();
    },
    limits: {
        files: 1,
        filesize: 3145728 // Max file size - 3MB
    },
    onFileUploadStart: function(file) {
        console.log(file.fieldname + ' is starting ...');
    },
    onFileUploadComplete: function(file) {
        console.log(file.fieldname + ' uploaded to ' + file.path);
        socket.broadcastEvent('fileAdded', {'url' : exports.getRelativePath(file.path)});
    },
    onParseStart: function() {
        console.log('Form parsing started');
    },
    onParseEnd: function(req, next) {
        console.log('Form parsing complete');
        next();
    },
    onError: function(err, next) {
        console.log(err);
        next(err);
    }
    });
    handler(req, res, next);
}

function validUploadRequest(req) {
  var apiKey = req.get("API_KEY");
  console.log("apiKey = ", apiKey);
  if (apiKey && apiKey == API_KEY) {
    return true;
  }
  return false;
}

exports.getRelativePath = function(filepath) {
  return filepath.substr(filepath.search(path.sep) + 1);
};

exports.getStockPics = function() {
  return getPicsFromFolder(STOCK_PICS_FOLDER, STOCK_PICS_PATH);
};

exports.getUploadedPics = function() {
  return getPicsFromFolder(UPLOADED_PICS_FOLDER, UPLOADED_PICS_PATH);
};

exports.handleFileUpload = function(req, res, next) {
  console.log("Handling file upload");
  if (validUploadRequest(req)) {
    multerUpload(req, res, next);
    res.end();
  } else {
    res.status(401).send("Invalid or missing API_KEY");
  }
};
