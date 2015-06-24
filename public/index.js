var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Toc = React.createClass({
	getInitialState: function() {
		return {
			data: null
		};
	},
	componentWillMount: function() {
		fetch('https://nodejs.org/api/index.json').then(function (res) {
			return res.json();
		}).then(function (data) {
			this.setState({
				data: data
			});
		}.bind(this));
	},

	render: function() {
		if (!this.state.data) {
			return <div>Loading...</div>;
		}
		var items = this.state.data.desc.filter(function (item) {
			return item.type === 'text';
		});

	    return <ul>
	    	{items.map(function (item) {
	    		return <li>
	    			<Link to={'/doc/' + item.text}>{item.text}</Link>
	    		</li>;
	    	})}
	    </ul>;
	}

});

var Doc = React.createClass({
	render: function() {
	    return <div>{this.props.params.id}</div>;
	}
});

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
