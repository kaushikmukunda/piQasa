'use strict';

var express = require('express');
var router = express.Router();
var fileUtils = require('../modules/fileUtils');

/* GET home page. */
router.route('/')
.get(function(req, res) {
  res.render('index');
});

router.route('/upload')
.post(function(req, res, next) {
  fileUtils.handleFileUpload(req, res, next);
});

router.route('/gallery')
.get(function(req, res) {

  fileUtils.getStockPics()
  .then(function(pics) {
    res.render('gallery', {'stockpics' : pics});
  })
  .catch(function(err) {
    console.log('err', err);
    res.render('gallery', {'error' : err});
  });

});

module.exports = router;
