import { alertConstants } from './../_constants/';

function alerts(state = {}, action) {
	switch (action.type) {
		case alertConstants.SUCCESS:
		case alertConstants.ERROR:
			return {
				...state,
				[action.payload.id]: {
					...action.payload
				}
			}
		case alertConstants.CLEAR:
			return {};
		default:
			return state;
	}
}

export default alerts;
