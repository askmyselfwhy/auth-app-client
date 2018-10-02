import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

import { Redirect } from 'react-router';

import { authActions, alertActions } from './../_actions/';
import { userService } from './../_services';
import Feedback from './../components/Feedback';

class Profile extends Component {
	state = {
		userData: null,
		isOpen: false
	}
	// Get user data
	componentWillMount() {
		let { user } = this.props;
		if (user)
			userService.getById(user.id)
				.then(user => this.setState({ userData: user }))
				.catch(err => this.props.alertError(err.message));
	}
	// Handling the deletion of account
	handleDeleting = () => {
		this.toggleModal();
		userService.delete(this.props.user.id)
			.then(data => this.props.authLogout())
			.catch(err => this.props.alertError(err.message))
	}
	toggleModal = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}
	render() {
		let { user } = this.props;
		let { userData } = this.state;
		return (
			<div className="profile-page">
				<Feedback></Feedback>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.isOpen}
					onClose={this.toggleModal}
				>
					<Paper className="modal">
						<Typography variant="title" id="modal-title">
							Do you really want to delete your account?
            </Typography>
						<Typography variant="subheading" id="simple-modal-description">
							<Button
								onClick={this.handleDeleting}
								color="primary"
								variant="contained">
								Yes
							</Button>
							<Button
								onClick={this.toggleModal}
								color="secondary"
								variant="contained">
								No
							</Button>
						</Typography>
					</Paper>
				</Modal>
				{user ?
					<Card className="profile-container">
						<nav>
							<Button
								color="primary"
								variant="contained"
								onClick={this.props.authLogout}>Logout
							</Button>
							<Button
								color="secondary"
								variant="contained"
								onClick={this.toggleModal}>
								<DeleteIcon />
								Delete
							</Button>
						</nav>
						{userData ?
							<React.Fragment >
								<h1>{userData.first_name + " " + userData.last_name}</h1>
								<p><span className="info-field">Your access token</span>: <span className="token">{user.token}</span></p>
								<p><span className="info-field">Your email</span>: {userData.email}</p>
								<p><span className="info-field">Information about you</span>: {userData.about}</p>
							</React.Fragment>
							:
							<p>Waiting for loading your information...</p>
						}
					</Card>
					:
					<Redirect to="/" />
				}
			</div>
		)
	}
}
const mapStateToProps = (state) => ({
	user: state.auth.user
})
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		...authActions,
		...alertActions
	}, dispatch)
}
export default
	connect(mapStateToProps, mapDispatchToProps)(Profile);
