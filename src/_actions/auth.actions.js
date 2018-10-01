import { userConstants } from './../_constants';

const authActions = {
  authRequest: () => ({
    type: userConstants.LOGIN_REQUEST,
  }),
  authError: () => ({
    type: userConstants.LOGIN_FAILURE,
  }),
  authSuccess: (data) => ({
    type: userConstants.LOGIN_SUCCESS,
    payload: {
      ...data
    }
  }),
  authLogout: () => ({
    type: userConstants.LOGOUT
  })
}
export default authActions;
