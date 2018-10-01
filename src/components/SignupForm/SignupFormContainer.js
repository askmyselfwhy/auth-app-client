import SignupForm from './SignupForm';

import { alertActions, registerActions } from '../../_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Form handling and validation
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { userService } from './../../_services';

// State
const mapStateToProps = (state) => ({
  isRegistering: state.registration.isRegistering,
  user: {
    email: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: ''
  }
})

// Dispatch the actions
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...alertActions,
    ...registerActions
  }, dispatch)
}

// Method to check the equality of two fields
Yup.addMethod(Yup.mixed, 'sameAs', function (ref, message) {
  return this.test('sameAs', message, function (value) {
    let other = this.resolve(ref);

    return !other || !value || value === other;
  })
})


export default connect(mapStateToProps, mapDispatchToProps)(withFormik({
  mapPropsToValues: (props) => {
    console.log(props);
    return {
      email: props.user.email,
      password1: props.user.password1,
      password2: props.user.password2,
      first_name: props.user.first_name,
      last_name: props.user.last_name,
    }
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().trim().lowercase()
      .email('Invalid email address').required('Email is required!'),
    password1: Yup.string().trim()
      .required('Password is required!')
      .oneOf([Yup.ref('password2'), null], "Passwords do not match"),
    password2: Yup.string().trim()
      .required('Password is required!')
      .oneOf([Yup.ref('password1'), null], "Passwords do not match"),
    first_name: Yup.string().trim()
      .required('First name is required!'),
    last_name: Yup.string().trim()
      .required('Last name is required!'),
  }),

  // Submitting the form
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    props.alertClear();
    props.registerRequest();
    userService.signup({ ...values })
      .then(user => {
        props.registerSuccess();
        props.alertSuccess("You have successfully created an account!");
        resetForm();
      })
      .catch(err => {
        props.alertError(err);
        props.registerError();
      });
  },
})(SignupForm));