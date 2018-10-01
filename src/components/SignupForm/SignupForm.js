import React, { Component } from 'react';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

class SignupForm extends Component {
	render() {
		const {
			values,
			touched,
			errors,
			handleChange,
			setFieldValue,
			handleSubmit,
			handleReset,
			isRegistering
		} = this.props;
		return (
			<div className="form-container" justify="center">
				<form autoComplete="off" onSubmit={handleSubmit}>
					{isRegistering && <CircularProgress />}
					<Grid container spacing={24}>
						<Grid item xs={12} md={12}>
							<Input
								name="first_name"
								placeholder="First name"
								type="text"
								onChange={handleChange}
								value={values.first_name}
								fullWidth
								inputProps={{
									autoComplete: 'off',
									className: 'custom-input'
								}}
							/>
							{errors.first_name && touched.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
						</Grid>
						<Grid item xs={12} md={12}>
							<Input
								name="last_name"
								placeholder="Last name"
								type="text"
								onChange={handleChange}
								value={values.last_name}
								fullWidth
								inputProps={{
									autoComplete: 'off',
									className: 'custom-input'
								}}
							/>
							{errors.last_name && touched.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
						</Grid>
						<Grid item xs={12} md={12} lg={12}>
							<Input
								name="email"
								placeholder="Email"
								type="email"
								onChange={handleChange}
								value={values.email}
								fullWidth
								inputProps={{
									autoComplete: 'off',
									className: 'custom-input'
								}}
								startAdornment={
									<InputAdornment position="start">
										<EmailIcon />
									</InputAdornment>
								}
							/>
							{errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
						</Grid>
						<Grid item xs={12} md={12} lg={12}>
							<Input
								name="password1"
								placeholder="Password"
								type="password"
								onChange={handleChange}
								value={values.password1}
								fullWidth
								inputProps={{
									autoComplete: 'off',
									className: 'custom-input'
								}}
								startAdornment={
									<InputAdornment position="start">
										<LockIcon />
									</InputAdornment>
								}
							/>
							{errors.password1 && touched.password1 && <div className="invalid-feedback">{errors.password1}</div>}
						</Grid>
						<Grid item xs={12} md={12}>
							<Input
								name="password2"
								placeholder="Repeat password"
								type="password"
								onChange={handleChange}
								value={values.password2}
								fullWidth
								inputProps={{
									autoComplete: 'off',
									className: 'custom-input'
								}}
								startAdornment={
									<InputAdornment position="start">
										<LockIcon />
									</InputAdornment>
								}
							/>
							{errors.password2 && touched.password2 && <div className="invalid-feedback">{errors.password2}</div>}
						</Grid>
						<Grid item xs={12} md={12}>
							<Button
								fullWidth
								type="submit">
								Sign up
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		);
	}
}

export default SignupForm;
