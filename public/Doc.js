var React = require('react');
var {Link} = require('react-router');

var Doc = React.createClass({
	statics: {
		loadProps(params, cb) {
			var name = params.id.match(/(\w+)\.html/)[1];
			var url = 'https://nodejs.org/api/' + name + '.json';

			fetch(url)
				.then(res => res.json())
				.then(data => {
					cb(null, {data: data});
				})
				.catch(cb);
		}
	},

	render: function() {
		var methods = this.props.data.modules[0].methods;
		return <div className="col-md-4" ><ul>
			{methods.map(function (method) {
				return <li>{method.name} </li>
			})}
		</ul></div>;
	}
});
module.exports = Doc;
