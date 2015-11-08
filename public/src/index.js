var React = require('react');
var ReactDom = require('react-dom');
var {Router, Route} = require('react-router');
var {history} = require('react-router/lib/BrowserHistory');
var AsyncProps = require('react-router/lib/experimental/AsyncProps')['default'];
var routes = require('./routes');

// restoring initail data
AsyncProps.rehydrate(__SERVER_PROPS_ARRAY__);
var asyncRoutes = <Route component={AsyncProps} children={routes} />;
ReactDom.render(
	<Router children={asyncRoutes} history={history} createElement={AsyncProps.createElement}/>,
	document.querySelector('.container')
);
