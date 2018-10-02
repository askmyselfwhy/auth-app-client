import React, { Component } from 'react';
import LoginFormContainer from '../components/LoginForm/LoginFormContainer';
import SignupFormContainer from '../components/SignupForm/SignupFormContainer';
import Feedback from '../components/Feedback';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';

import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { alertActions, authActions } from '../_actions';
import { storageActions } from '../_helpers';

class Home extends Component {
  state = {
    value: 0
  };
  componentDidMount() {
    let user = storageActions.getFromStorage();
    if (user) {
      this.props.authSuccess(user);
    }
  }
  handleChange = (event, value) => {
    if (value !== this.state.value) {
      this.setState({ value }, () => {
        this.props.alertClear();
      });
    }
  };
  render() {
    const { value } = this.state;
    const { isLogged } = this.props;
    return (
      <div className="home-page">
        {isLogged ?
          <Redirect to="/profile" />
          :
          <Card className="form-card">
            <AppBar position="static" className="tab-bar">
              <Tabs value={value} onChange={this.handleChange} fullWidth>
                <Tab label="Sign in" />
                <Tab label="Sign up" />
              </Tabs>
            </AppBar>
            <div className="tab-content">
              <Feedback />
              {value === 0 && <LoginFormContainer />}
              {value === 1 && <SignupFormContainer />}
            </div>
          </Card>

        }

      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged,
  user: state.user
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...alertActions,
    ...authActions
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
