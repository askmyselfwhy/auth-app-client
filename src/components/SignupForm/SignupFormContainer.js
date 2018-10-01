import SignupForm from './SignupForm';

import { alertActions } from '../../_actions';
import { connect } from 'react-redux';

// Form handling and validation
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { messagesConstants } from '../../_constants';

// State
const mapStateToProps = (state) => ({
  user: {
    email: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: ''
  }
})

// Dispatch the actions
const mapDispatchToProps = (dispatch) => ({
  successAlert: (message) => dispatch(alertActions.success(message)),
  errorAlert: (message) => dispatch(alertActions.error(message)),
  clearAlerts: () => dispatch(alertActions.clear())
})

// Method to check the equality of two fields
Yup.addMethod(Yup.mixed, 'sameAs', function (ref, message) {
  return this.test('sameAs', message, function (value) {
    let other = this.resolve(ref);

    return !other || !value || value === other;
  })
})


export default connect(mapStateToProps, mapDispatchToProps)(withFormik({
  mapPropsToValues: (props) => {
    return {
      email: props.user.email,
      password1: props.user.password1,
      password2: props.user.password2,
      first_name: props.user.first_name,
      last_name: props.user.last_name,
    }
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required!'),
    password1: Yup.string().required('Password is required!').oneOf([Yup.ref('password2'), null], "Passwords do not match"),
    password2: Yup.string().required('Password is required!').oneOf([Yup.ref('password1'), null], "Passwords do not match"),
    first_name: Yup.string().required('First name is required!'),
    last_name: Yup.string().required('Last name is required!'),
  }),

  // Submitting the form
  handleSubmit: (values, { props, setSubmitting }) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(values)
    }).then(response => {
      if (response.status === 404) {
        props.errorAlert(messagesConstants.WRONG_CREDENTIALS)
      } else if (response.status === 201) {
        props.successAlert(messagesConstants.SUCCESSFULLY_REGISTRATED)
      }
    }
    );
  },
})(SignupForm));