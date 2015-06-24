var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Toc = require('./Toc');
var Doc = require('./Doc');

var App = React.createClass({
	render: function() {
		return <div>
			<h1>App</h1>
	    	<Link to="toc">toc</Link>
	    	<RouteHandler params={this.props.params}/>
		</div>;
	}
});

var routes = (
	<Route location="history">
		<Route path="/" handler={App}>
			<Route path="toc" name="toc" handler={Toc} />
			<Route path="doc/:id" name="doc" handler={Doc} />
		</Route>
	</Route>
);

Router.run(routes, Router.HashLocation, function (Handler, props) {
	React.render(
		<Handler params={props.params}/>,
		document.querySelector('.container')
	);
});
