import { combineReducers } from 'redux';

import auth from './auth.reducer';
import registration from './registration.reducer';
import alerts from './alerts.reducer';
import user from './user.reducer';

export default combineReducers({
	auth,
	registration,
	alerts,
	user
});
