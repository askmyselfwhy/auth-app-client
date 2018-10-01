import { alertConstants } from './../_constants';

const alertActions = {
  success: (messageConstant) => ({
    type: alertConstants.SUCCESS,
    payload: {
      ...messageConstant,
      className: 'log-success'
    }
  }),
  error: (messageConstant) => ({
    type: alertConstants.ERROR,
    payload: {
      ...messageConstant,
      className: 'log-error'
    }
  }),
  clear: () => ({
    type: alertConstants.CLEAR,
  })
}
export default alertActions;