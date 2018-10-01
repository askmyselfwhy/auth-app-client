import React, { Component } from 'react';

import Profile from './Pages/Profile';
import Home from './Pages/Home';
import { PrivateRoute } from './components/PrivateRoute';

import { Route } from 'react-router';

class App extends Component {
	render() {
		return (
			<div>
				<Route exact path='/' component={Home} />
				<PrivateRoute path="/profile" component={Profile} />
				<Route render={() => <div>Error Page</div>} />
			</div>
		);
	}
}


export default App;
