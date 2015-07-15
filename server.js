require('babel/register')
var express = require('express');
var app = express();

var routes = require('./public/routes');
var Router = require('react-router').Router;
var Location = require('react-router/lib/Location');
var React = require('react');
var render = require('./componentWraper');
var intdexHtml = require('fs').readFileSync('public/index.html', 'utf8');

app.use(express.static('public'));

app.use(function (req, res, next) {
	var location = new Location(req.url, req.query);
	Router.run(routes, location, function(err, state) {
		if (err) {
			return next(err);
		}
		render(state, function (err, html) {
			var page = intdexHtml.replace('{{html}}', html);
			res.end(page);
		});
	});
});

app.listen(process.env.PORT || 3000);
