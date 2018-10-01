import React, { Component } from 'react';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';

const LoginForm = (props) => {
	let { auth } = props;
	const {
		values,
		touched,
		errors,
		dirty,
		isSubmitting,
		handleChange,
		setFieldValue,
		handleBlur,
		handleSubmit,
		handleReset,
	} = props;
	return (
		<div className="form-container">
			<form autoComplete="new-password" onSubmit={handleSubmit}>
				{(auth && auth.isLogging) && <CircularProgress />}
				<Grid container spacing={24}>
					<Grid item xs={12} md={12}>
						<Input
							name="email"
							placeholder="Email"
							margin="dense"
							type="email"
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
							fullWidth
							inputProps={{
								autoComplete: 'new-password',
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
					<Grid item xs={12} md={12}>
						<Input
							name="password"
							placeholder="Password"
							margin="dense"
							type="password"
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
							fullWidth
							inputProps={{
								autoComplete: 'new-password',
								className: 'custom-input'
							}}
							startAdornment={
								<InputAdornment position="start">
									<LockIcon />
								</InputAdornment>
							}
						/>
						{errors.password && touched.password && <div className="invalid-feedback">{errors.password}</div>}
					</Grid>
					<Grid item xs={12} md={12} >
						<Button
							type="submit"
							fullWidth
						>
							Sign in
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
}

export default LoginForm;

