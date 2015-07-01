var React = require('react');
var Link = require('react-router').Link;

var Doc = React.createClass({
	getInitialState: function() {
		return {
			data: null
		};
	},
	componentWillMount: function() {
		var id = this.props.params.id;
		var name = id.match(/(\w+)\.html/)[1];
		var url = 'https://nodejs.org/api/' + name + '.json';

		fetch(url).then(function (res) {
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
		var methods = this.state.data.modules[0].methods;
		return <div className="col-md-4" ><ul>
			{methods.map(function (method) {
				return <li>{method.name} </li>
			})}
		</ul></div>;
	}
});
module.exports = Doc;
