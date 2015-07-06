var React = require('react');
var {Link} = require('react-router');

var Doc = React.createClass({
	getInitialState: function() {
		return {
			data: null
		};
	},
	componentWillMount: function() {
		this.fetch(this.props.params.id);
	},
	componentWillReceiveProps: function (newProps) {
		this.fetch(newProps.params.id);
	},
	fetch: function (id) {
		var name = id.match(/(\w+)\.html/)[1];
		var url = 'https://nodejs.org/api/' + name + '.json';

		fetch(url).then(function (res) {
			return res.json();
		}).then(data => {
			this.setState({
				data: data
			});
		});

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
