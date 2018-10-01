import v4 from 'uuid';

const messages = {
  FIELDS_REQUIRED: 'All fields are required!<br>Fill them with information!',
  WRONG_CREDENTIALS: 'Email or password is wrong!',
  SUCCESSFULLY_REGISTRATED: 'You successfully created account!',
  SUCCESSFULLY_LOGGED: 'You successfuly have logged!',
}
export const messagesConstants = Object.keys(messages).reduce((prev, key) => {
  return {
    ...prev,
    [key]: {
      id: v4(),
      message: messages[key]
    }
  }
}, {})

