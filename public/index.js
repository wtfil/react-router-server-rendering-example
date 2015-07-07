var React = require('react');
var routes = require('./routes');
var {Router, Route, Link} = require('react-router');
var {history} = require('react-router/lib/BrowserHistory');

React.render(
	<Router children={routes} history={history} />,
	document.querySelector('.container')
);
