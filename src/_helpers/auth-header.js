import storageActions from './storage';

export function authHeader() {
  // Return authorization header with jwt token
  let user = storageActions.getFromStorage();
  if (user && user.token) {
    return { 'Authorization': 'Bearer ' + user.token };
  } else {
    return {};
  }
}