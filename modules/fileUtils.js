'use strict';

var fs = require('fs');
var promise = require('bluebird');
var path = require('path');

var STOCK_PICS_FOLDER = 'stock';
var STOCK_PICS_PATH = 'public' + path.sep + STOCK_PICS_FOLDER;

var exports = module.exports = {};

exports.getRelativePath = function(path) {
  return path.substr(path.search(path.sep) + 1);
};

exports.getStockPics = function() {
  return new promise(function(resolve, reject) {
    fs.readdir(STOCK_PICS_PATH, function(err, files) {
      if (err) {
        reject(err);
      } else {
        resolve(filterImagePics(files));
      }
    });
  });
};

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

function filterImagePics(fileList) {
    var stockPics = [];
    fileList.forEach(function(file) {
      if (imagePic(file)) {
        stockPics.push(STOCK_PICS_FOLDER + path.sep + file);
      }
    });
    console.log('stockPics', stockPics);
    return stockPics;
}
