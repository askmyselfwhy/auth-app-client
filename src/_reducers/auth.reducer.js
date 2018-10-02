import { userConstants } from '../_constants/index.js';
import { storageActions } from './../_helpers';

let user = storageActions.getFromStorage();
const initialState = user ? { isLogged: true, user } : {};

function auth(state = initialState, action) {
	switch (action.type) {
		case userConstants.LOGIN_REQUEST:
			return {
				isLogging: true,
			};
		case userConstants.LOGIN_SUCCESS:
			storageActions.saveToStorage(action.payload);
			return {
				isLogged: true,
				user: action.payload
			};
		case userConstants.LOGIN_FAILURE:
			return {};
		case userConstants.LOGOUT:
			storageActions.removeFromStorage()
			return {};
		default:
			return state;
	}
}

export default auth;
