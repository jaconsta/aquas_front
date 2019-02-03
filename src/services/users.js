import axios from 'axios'
import { apiBaseUrl } from '../constants'
import { storeUserCredentials } from '../utils/auth'

const loginWasOk = loginResponse => {
  storeUserCredentials(loginResponse.data)
}

export const userLogin = credentials => {
  return axios.post(
      `${apiBaseUrl}auth/login/`,
      credentials,
      {'Access-Control-Allow-Origin': '*'}
    )
   .then(loginWasOk)
   .catch((err) => { throw new Error('Invalid credentials')})
}

export const userRegister = registrationForm => {
  return axios.post(
      `${apiBaseUrl}auth/register/`,
      registrationForm,
      {'Access-Control-Allow-Origin': '*'}
    )
   .then(response => response.data)
   .catch((err) => { throw new Error(err.response.data.error) })
}
