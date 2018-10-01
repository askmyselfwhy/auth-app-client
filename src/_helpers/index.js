import { messagesConstants } from './../_constants';
import storageActions from './storage';

export const loginValidation = ({ email, password }) => {
  let errors = [];

  if (!email || !password) {
    errors.push(messagesConstants.FIELDS_REQUIRED)
  }
  if (password.length < 6) {

  }

  return true;
}

export { storageActions };

export const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
// export const loginValidation = ({ email, password }) => {
//   let errors = [];

//   if (!email || !password) {
//     errors.push(messagesConstants.FIELDS_REQUIRED)
//   }
//   if (password.length < 6){

//   }

//     return true;
// }