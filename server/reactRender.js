var React = require('react');
var Router = require('react-router').Router;
var Location = require('react-router/lib/Location');
var AsyncProps = require('react-router/lib/experimental/AsyncProps')['default'];

function createMiddleware(opts) {

	return function(req, res, next) {
		var location = new Location(req.url, req.query);
		Router.run(opts.routes, location, function(err, state) {

			if (err) {
				return next(err);
			}

			AsyncProps.hydrate(state, function (err, asyncProps) {
				if (err) {
					return next(err);
				}

				state.components = state.components.map(function (Component, index) {
					var props = asyncProps.propsArray[index];
					return React.createClass({
						render() {
							return <Component {...props} {...this.props}/>;
						}
					});
				});

				var html, page;

				try {
					html = React.renderToString(React.createFactory(Router)(state));
					page = opts.renderPage(html, asyncProps.propsArray);
				} catch (err) {
					return next(err);
				}
				res.end(page);
			});
		});
	}

}

module.exports = createMiddleware;
