const STORAGE_ID = 'my_test-app';

const storageActions = {
  saveToStorage: (user) => {
    localStorage.setItem(STORAGE_ID, JSON.stringify(user))
  },
  getFromStorage: () => {
    return JSON.parse(localStorage.getItem(STORAGE_ID));
  },
  removeFromStorage: () => {
    localStorage.removeItem(STORAGE_ID);
  }
}
export default storageActions;

