var React = require('react');
var superagent = require('superagent');
var {Link} = require('react-router');

var Doc = React.createClass({
	statics: {
		loadProps(params, cb) {
			var name = params.id.match(/(\w+)\.html/)[1];
			var url = 'https://nodejs.org/api/' + name + '.json';

			superagent
				.get(url)
				.accept('application/json')
				.end((err, res) => {
					if (err) {
						return cb(err);
					}
					cb(null, {data: res.body});
				});
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
