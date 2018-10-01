import { alertConstants } from './../_constants/';

function alerts(state = {}, action) {
	switch (action.type) {
		case alertConstants.SUCCESS:
			return {
				type: 'valid-feedback',
				message: action.message
			}
		case alertConstants.ERROR:
			return {
				type: 'invalid-feedback',
				message: action.message
			}
		case alertConstants.CLEAR:
			return {};
		default:
			return state;
	}
}

export default alerts;
