var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Toc = React.createClass({
	render: function() {
	    return <div>Table of content</div>;
	}
});

var Doc = React.createClass({
	render: function() {
	    return <div>Document</div>;
	}
});

var App = React.createClass({
	render: function() {
		console.log('app');
		return <div>
			<h1>App</h1>
	    	<Link to="toc">toc</Link>
	    	<Link to="doc">doc</Link>
	    	<RouteHandler />
		</div>;
	}
});

var routes = (
	<Route location="history">
		<Route path="/" handler={App}>
			<Route path="toc" name="toc" handler={Toc} />
			<Route path="doc" name="doc" handler={Doc} />
		</Route>
	</Route>
);

console.log(Router);
Router.run(routes, Router.HashLocation, function (Handler) {
	React.render(
		<Handler/>,
		document.querySelector('.container')
	);
});
