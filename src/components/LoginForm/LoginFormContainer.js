import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Form handling and validation
import { withFormik } from 'formik';
import * as Yup from 'yup';

import LoginForm from './LoginForm'
import { authActions, alertActions } from '../../_actions';
import { userService } from './../../_services';

// State
const mapStateToProps = (state) => ({
  isLogging: state.auth.isLogging,
  user: {
    email: '',
    password: ''
  }
})
// Dispatchers
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...alertActions,
    ...authActions
  }, dispatch)

}
export default connect(mapStateToProps, mapDispatchToProps)(withFormik({
  mapPropsToValues: (props) => {
    return {
      email: props.user.email,
      password: props.user.password,
    }
  },
  // Define the validation schema for inputs
  validationSchema: Yup.object().shape({
    email: Yup.string().trim().lowercase().email('Invalid email address').required('Email is required!'),
    password: Yup.string().trim().required('Password is required!'),
  }),
  // Submitting the form
  handleSubmit: (values, { props, setSubmitting }) => {
    props.alertClear();
    props.authRequest();
    userService.login(values.email, values.password)
      .then(user => {
        props.authSuccess(user)
      })
      .catch(err => {
        props.alertError(err);
        props.authError();
      });

  },
})(LoginForm));