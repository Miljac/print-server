var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var printer = require('./routes/printer.js');

var APP_PORT = 3000;
var PRINTER_ROUTE = '/printer';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(PRINTER_ROUTE, printer);

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.listen(APP_PORT, function () {
	console.log('http server listening on port ' + APP_PORT);
});