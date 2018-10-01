import { userConstants } from './../_constants';

const authActions = {
  request: () => ({
    type: userConstants.LOGIN_REQUEST,
  }),
  error: () => ({
    type: userConstants.LOGIN_FAILURE,
  }),
  success: (data) => ({
    type: userConstants.LOGIN_SUCCESS,
    payload: {
      ...data
    }
  }),
  logout: () => ({
    type: userConstants.LOGOUT
  })
}
export default authActions;
