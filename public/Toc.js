var React = require('react');
var superagent = require('superagent');
var {Link, RouteHandler} = require('react-router');

var Toc = React.createClass({
	getInitialState: function() {
		return {
			data: null
		};
	},

	componentWillMount: function() {
		superagent.get('https://nodejs.org/api/index.json').end(function (err, data) {
			console.log(data);
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

	  return <div>
	  	  <div className="col-md-4" ><ul>
	    		{items.map(function (item) {
	    			return <li>
	    				<Link to={'/toc/' + item.text}>{item.text}</Link>
	    			</li>;
	    		})}
	  	  </ul></div>
	  	  <div className="col-md-4">
	  	  	<RouteHandler />
	  	  </div>
	  </div>;

	}

});

module.exports = Toc;