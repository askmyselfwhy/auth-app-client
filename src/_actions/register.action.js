import { userConstants } from './../_constants';

const registerActions = {
  request: () => ({
    type: userConstants.REGISTER_REQUEST,
  }),
  error: () => ({
    type: userConstants.REGISTER_FAILURE,
  }),
  success: (data) => ({
    type: userConstants.REGISTER_SUCCESS,
    payload: {
      ...data
    }
  })
}
export default registerActions;
