import { userConstants } from './../_constants/';

function registration(state = {}, action) {
	switch (userConstants) {
		case userConstants.REGISTER_REQUEST:
			return {};
		case userConstants.REGISTER_SUCCESS:
			return {};
		case userConstants.REGISTER_FAILURE:
			return {};
		default:
			return state;
	}
}

export default registration;
