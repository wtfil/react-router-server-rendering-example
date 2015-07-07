var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

console.log(Router);
Router.run(routes, Router.HistoryLocation, function (Handler, props) {
	React.render(
		<Handler params={props.params}/>,
		document.querySelector('.container')
	);
});
