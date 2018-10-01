import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
// Form handling and validation
import { withFormik } from 'formik';
import * as Yup from 'yup';

import LoginForm from './LoginForm'
import { authActions, alertActions } from '../../_actions';
import { userService } from './../../_services';

const mapStateToProps = (state) => ({
  isLogging: state.auth.isLogging,
  user: {
    email: '',
    password: ''
  }
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...alertActions,
    ...authActions
  }, dispatch)

}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withFormik({
  mapPropsToValues: (props) => {
    return {
      email: props.user.email,
      password: props.user.password,
    }
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().trim().lowercase().email('Invalid email address').required('Email is required!'),
    password: Yup.string().trim().required('Password is required!'),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.alertClear();
    props.authRequest();
    userService.login(values.email, values.password)
      .then(user => {
        props.authSuccess(user)
        props.history.push('/profile')
      })
      .catch(err => {
        console.log(err)
        props.alertError(err);
        props.authError();
      });

  },
})(LoginForm)));