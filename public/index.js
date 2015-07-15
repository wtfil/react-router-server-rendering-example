var React = require('react');
var routes = require('./routes');
var {Router, Route} = require('react-router');
var {history} = require('react-router/lib/BrowserHistory');
var AsyncProps = require('react-router/lib/experimental/AsyncProps')['default'];

// restoring initail data
AsyncProps.rehydrate(__SERVER_PROPS_ARRAY__);
var asyncRoutes = <Route component={AsyncProps} children={routes} />;
React.render(
	<Router children={asyncRoutes} history={history} createElement={AsyncProps.createElement}/>,
	document.querySelector('.container')
);
