import { userConstants } from '../_constants/index.js';
import { storageActions } from './../_helpers';

let initialState = {
	isLogging: false,
	isLogged: false
}
function auth(state = initialState, action) {
	switch (action.type) {
		case userConstants.LOGIN_REQUEST:
			return {
				isLogging: true,
				isLogged: false
			};
		case userConstants.LOGIN_SUCCESS:
			storageActions.saveToStorage(action.payload);
			return {
				isLogging: false,
				isLogged: true,
				user: action.payload
			};
		case userConstants.LOGIN_FAILURE:
			return {
				isLogging: false,
				isLogged: false,
			};
		case userConstants.LOGOUT:
			storageActions.removeFromStorage()
			return {
				isLogging: false,
				isLogged: false,
			};
		default:
			return state;
	}
}

export default auth;
