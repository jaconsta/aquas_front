import _ from 'lodash'
const LOCAL_STORAGE_KEY = 'userToken'

export const storeUserCredentials = userData => {
  const tokenString = JSON.stringify(userData)
  localStorage.setItem(LOCAL_STORAGE_KEY, tokenString)
}

export const getUserSession = () => {
  const tokenString = localStorage.getItem(LOCAL_STORAGE_KEY)
  return JSON.parse(tokenString)
}

export const getUserSessionToken = () => {
  return _.get(getUserSession(), 'token')
}

export const isLoggedIn = () => !_.isNil(localStorage.getItem(LOCAL_STORAGE_KEY))

export const logoutUser = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}
