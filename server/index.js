require('babel/register')
var express = require('express');
var app = express();

var routes = require('../public/src/routes');
var reactRender = require('./reactRender');
var intdexHtml = require('fs').readFileSync(__dirname + '/../public/index.html', 'utf8');

function renderPage(html, propsArray) {
	// sending initail data to client to avoid double fetching
	html += '<script>__SERVER_PROPS_ARRAY__=' + JSON.stringify(propsArray) +'</script>'
	return intdexHtml.replace('{{html}}', html);
}

app.use(express.static('public/build'));
app.use(reactRender({
	routes: routes,
	renderPage: renderPage
}));

app.listen(process.env.PORT || 3000);
