import React, { Component } from 'react';

import ProfilePage from './Pages/Profile';
import HomePage from './Pages/Home';
import ErrorPage from './Pages/ErrorPage';
import { PrivateRoute } from './components/PrivateRoute';

import { Route, Switch, Redirect } from 'react-router';

class App extends Component {
	render() {
		return (
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route exact path='/login' render={() => <Redirect to="/" />} />
				<PrivateRoute path="/profile" component={ProfilePage} />
				<Route component={ErrorPage} />
			</Switch>
		);
	}
}


export default App;
