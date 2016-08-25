var express = require('express');
var router = express.Router();
var printer = require('printer');
var util = require('util');
var bixolonPrinter = require('../service/bixolon-printer.js');

router.get('/', function (req, res) {
	bixolonPrinter.printText(req.query.text, 255);
	res.send('success');
});

router.get('/cut', function(req, res) {
	bixolonPrinter.cutPapperFeed(255);
	res.send('success');
});

module.exports = router;