import { authHeader } from '../_helpers';
import { storageActions } from '../_helpers'

export const userService = {
  login,
  logout,
  signup,
  getById,
  // update,
  // delete: _delete
};

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };
  return fetch(`${process.env.REACT_APP_API_URL}/users/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // Login successful if there is a jwt token in the response
      if (user.token) {
        // Store user details and jwt token in local storage to keep user logged in between page refreshes
        storageActions.saveToStorage(user);
      }
      return user;
    })
}

function logout() {
  // Remove user from local storage to log user out
  storageActions.removeFromStorage();
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, requestOptions)
    .then(handleResponse)
}

function signup(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };
  return fetch(`${process.env.REACT_APP_API_URL}/users/signup`, requestOptions)
    .then(handleResponse);
}

// function update(user) {
//   const requestOptions = {
//     method: 'PUT',
//     headers: { ...authHeader(), 'Content-Type': 'application/json' },
//     body: JSON.stringify(user)
//   };

//   return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//   const requestOptions = {
//     method: 'DELETE',
//     headers: authHeader()
//   };

//   return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // Auto logout if 401 response returned from api
        logout();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}