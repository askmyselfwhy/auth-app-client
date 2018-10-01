import LoginForm from './LoginForm'
import { authActions, alertActions } from '../../_actions';
import { connect } from 'react-redux';

// Form handling and validation
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { messagesConstants } from '../../_constants';

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: {
    email: '',
    password: ''
  }
})

const mapDispatchToProps = (dispatch) => ({
  successAlert: (message) => dispatch(alertActions.success(message)),
  errorAlert: (message) => dispatch(alertActions.error(message)),
  clearAlerts: () => dispatch(alertActions.clear()),

  loginRequest: () => dispatch(authActions.request()),
  loginError: () => dispatch(authActions.error()),
  loginSuccess: (data) => dispatch(authActions.success(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(withFormik({
  mapPropsToValues: (props) => {
    return {
      email: props.user.email,
      password: props.user.password,
    }
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required!'),
    password: Yup.string().required('Password is required!'),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.loginRequest();
    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(values)
    }).then(response => {
      if (response.status === 404) {
        props.errorAlert(messagesConstants.WRONG_CREDENTIALS)
        props.loginError();
      } else if (response.status === 200) {
        response.json()
          .then(data => props.loginSuccess(data))
      }
    }
    );
  },
})(LoginForm));