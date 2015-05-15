'use strict';

var fs = require('fs');
var promise = require('bluebird');
var path = require('path');

var STOCK_PICS_FOLDER = 'stock';
var STOCK_PICS_PATH = 'public' + path.sep + STOCK_PICS_FOLDER;
var UPLOADED_PICS_FOLDER = 'uploads';
var UPLOADED_PICS_PATH = 'public' + path.sep + UPLOADED_PICS_FOLDER;

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
  return new promise(function(resolve, reject) {
    fs.readdir(folderPath, function(err, files) {
      if (err) {
        reject(err);
      } else {
        resolve(filterImagePics(files, folder));
      }
    });
  });
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

