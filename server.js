require('babel/register')
var express = require('express');
var app = express();

var routes = require('./public/routes');
var Router = require('react-router').Router;
var Location = require('react-router/lib/Location');
var React = require('react');

app.use(express.static('public'));

app.get('/', function(req, res) {
  	res.send('hello world');
});

app.use(function (req, res, next) {
	var location = new Location(req.url, req.query);
	Router.run(routes, location, function(err, state) {
		if (err) {
			return next(err);
		}
		var html = React.renderToString(React.createFactory(Router)(state));
		res.end(html);
	});
});
app.listen(process.env.PORT || 3000);
