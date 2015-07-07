var React = require('react');
var {Router, Route, Link} = require('react-router');
var {history} = require('react-router/lib/BrowserHistory');
var Toc = require('./Toc');
var Doc = require('./Doc');

var App = React.createClass({
	render: function() {
		return <div>
			<div className="page-header"><h1>React test application</h1></div>
			<div className="col-md-4">
				<Link className="btn btn-block btn-primary" to="/">Home</Link>
				<Link className="btn btn-block btn-primary" to="toc">Load table of content</Link>
			</div>
			{this.props.children}
		</div>;
	}
});

var routes = (
	<Router history={history}>
		<Route path="/" component={App}>
			<Route path="toc" name="toc" component={Toc} >
				<Route path=":id" name="doc" component={Doc} />
			</Route>
		</Route>
	</Router>
);

React.render(routes, document.querySelector('.container'));
