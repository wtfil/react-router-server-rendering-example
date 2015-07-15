require('babel/register')
var express = require('express');
var app = express();

var routes = require('../public/routes');
var reactRender = require('./reactRender');
var intdexHtml = require('fs').readFileSync(__dirname + '/../public/index.html', 'utf8');

function renderPage(html) {
	return intdexHtml.replace('{{html}}', html);
}

app.use(express.static('public'));
app.use(reactRender({
	routes: routes,
	renderPage: renderPage
}));

app.listen(process.env.PORT || 3000);
