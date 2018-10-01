import { userConstants } from './../_constants';

const registerActions = {
  registerRequest: () => ({
    type: userConstants.REGISTER_REQUEST,
  }),
  registerError: () => ({
    type: userConstants.REGISTER_FAILURE,
  }),
  registerSuccess: (data) => ({
    type: userConstants.REGISTER_SUCCESS,
  })
}
export default registerActions;
