require('babel/register')
var express = require('express');
var app = express();

var routes = require('./public/routes');
var Router = require('react-router');
var React = require('react');

app.use(express.static('public'));

app.get('/', function(req, res) {
  	res.send('hello world');
});

app.use(function (req, res) {
	var router = Router.create({location: req.url, routes: routes});
	router.run(function(Handler, state) {
		var html = React.renderToString(React.createFactory(Handler)(null));
		res.end(html);
	});
});
app.listen(process.env.PORT || 3000);
