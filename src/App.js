import React, { Component } from 'react';
import LoginFormContainer from './components/LoginForm/LoginFormContainer';
import SignupFormContainer from './components/SignupForm/SignupFormContainer';
import Profile from './Pages/Profile';
import LogsContainer from './components/LogsContainer';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';

import { connect } from 'react-redux';

import { alertActions, authActions } from './_actions';
import { storageActions } from './_helpers';

class App extends Component {
	state = {
		value: 0
	};
	componentDidMount() {
		let user = storageActions.getFromStorage();
		if (user) {
			this.props.loginSuccess(user);
		}
	}
	handleChange = (event, value) => {
		if (value !== this.state.value) {
			this.setState({ value }, () => {
				this.props.clearAlerts();
			});
		}
	};
	render() {
		const { value } = this.state;
		const { auth } = this.props;
		return (
			<main>
				{auth && auth.user ?
					<Profile />
					:
					<div className="container">
						<Card className="form-card">
							<AppBar position="static" className="tab-bar">
								<Tabs value={value} onChange={this.handleChange} fullWidth>
									<Tab label="Sign in" />
									<Tab label="Sign up" />
								</Tabs>
							</AppBar>
							<div className="tab-content">
								<LogsContainer />
								{value === 0 && <LoginFormContainer />}
								{value === 1 && <SignupFormContainer />}
							</div>
						</Card>
					</div>
				}
			</main>
		);
	}
}
const mapStateToProps = (state) => ({
	auth: state.auth,
	user: state.user
});
const mapDispatchToProps = (dispatch) => ({
	clearAlerts: () => dispatch(alertActions.clear()),

	loginSuccess: (data) => dispatch(authActions.success(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
