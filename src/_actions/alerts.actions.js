import { alertConstants } from './../_constants';

const alertActions = {
  alertSuccess: (message) => ({
    type: alertConstants.SUCCESS,
    message
  }),
  alertError: (message) => ({
    type: alertConstants.ERROR,
    message
  }),
  alertClear: () => ({
    type: alertConstants.CLEAR,
  })
}
export default alertActions;