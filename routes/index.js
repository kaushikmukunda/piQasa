'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/')
.get(function(req, res) {
  res.render('index');
});

router.route('/upload')
.post(function(req, res) {
  console.log(req.files);
  res.redirect('/');
});

router.route('/gallery')
.get(function(req, res) {
  res.render('gallery');
});

module.exports = router;
