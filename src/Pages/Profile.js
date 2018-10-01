import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

import Avatar from '@material-ui/core/Avatar';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { authActions } from './../_actions/';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
});


class Profile extends Component {
	state = {
		userData: null,
		isEditable: false
	}
	componentDidMount() {
		let { user } = this.props;
		console.log(user)
		fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		}).then(response => response.json())
			.then(data => this.setState({
				userData: data
			}))
	}
	toggleEdit = () => {
		this.setState((state, cprops) => {
			return {
				isEditable: !state.isEditable
			}
		})
	}
	handleLogout() {
		this.props.userLogout();
	}
	render() {
		let { user } = this.props;
		let { userData, isEditable } = this.state;
		const { classes } = this.props;
		return (
			<div className="profile">
				<h2>It's your profile page</h2>
				{userData ?
					<div className="profile-container">
						<div className="row">
							<Avatar src={userData.imgURL}>
								{userData.first_name[0] + userData.last_name[0]}
							</Avatar>
						</div>
						{isEditable ?
							<React.Fragment>
								<input
									accept="image/*"
									className={classes.input}
									id="contained-button-file"
									multiple
									type="file"
								/>
								<label htmlFor="contained-button-file">
									<Button variant="contained" component="span" className={classes.button}>
										Change profile photo
									</Button>
								</label>
							</React.Fragment>
							:
							''
						}

						{isEditable ?
							<Grid container justify="center" spacing={24}>
								<Grid item md={6}>
									<TextField
										label="Enter your first name"
										placeholder="First name"
										margin="normal"
										defaultValue={userData.first_name}
										fullWidth
										required
									/>
								</Grid>
								<Grid item md={6}>
									<TextField
										label="Enter your last name"
										placeholder="Last name"
										margin="normal"
										defaultValue={userData.last_name}
										fullWidth
										required
									/>
								</Grid>
								<Grid item md={12} sm={12} lg={12}>
									<TextField
										label="Write information about yourself"
										placeholder="Last name"
										margin="normal"
										defaultValue={userData.about}
										fullWidth
										multiline
									/>
								</Grid>
							</Grid>
							:
							<React.Fragment>
								<h1>{userData.first_name + ' ' + userData.last_name}</h1>
								<p>{userData.about}</p>
							</React.Fragment>
						}
						<Button onClick={this.toggleEdit}>
							Edit
						</Button>
						<Button
							onClick={this.handleLogout.bind(this)}
							className="btn-logout"
						>Logout</Button>
					</div>
					:
					<div></div>
				}

			</div>
		)
	}
}
const mapStateToProps = (state) => ({
	user: state.auth.user
})
const mapDispatchToProps = (dispatch) => ({
	userLogout: () => dispatch(authActions.logout())
})
export default
	connect(mapStateToProps, mapDispatchToProps)
		(withStyles(styles)(Profile));