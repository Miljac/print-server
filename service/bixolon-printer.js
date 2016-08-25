var printer = require('printer');
var util = require('util');

var PRINTER = 'SRP-150';

var INIT_PRINTER = '\x1B\x40';
var PRINT_BUFFER_DATA = '\x1B\x64\x05';
var SELECT_CHARACTER_SIZE = '\x1D\x21\x55';
var PRINT_AND_FEED = '\x1B\x4A\x7F'
var LINE_FEED = '\x0A';
var PAPER_CUT = '\x1D\x56\x31';
var PAPER_CUT_FEED = '\x1D\x56\x42';

exports.getDefaultPrinter = function() {
	return printer.getDefaultPrinterName() || 'is not defined on your computer';
};

exports.printText = function(text, feed) {
	console.log('printer: ' + text);
	console.log(feed);
	var hexFeed = feed.toString(16);
	printer.printDirect({
		data: new Buffer(PRINT_AND_FEED) + new Buffer(SELECT_CHARACTER_SIZE) + text + 
		new Buffer(PRINT_BUFFER_DATA) + new Buffer(PAPER_CUT_FEED + hexFeed),
		printer: PRINTER,
		type: 'RAW',
		success: function (jobID) {
			console.log("sent to printer with ID: " + jobID);
		},
		error: function (err) {
			console.log(err);
		}
	});
};

exports.cutPapperFeed = function(feed) {
	var hexFeed = feed.toString(16);
	printer.printDirect({
		data: new Buffer(PAPER_CUT_FEED + hexFeed),
		type: "RAW",
		success: function () {
			console.log("cut + feed");
		},
		error: function (err) {
			console.log(err);
		}
	});
};