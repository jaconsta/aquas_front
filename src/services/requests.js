import axios from 'axios'

import { apiBaseUrl } from '../constants'
import { getUserSessionToken } from '../utils/auth'

export const apiRequest = ({body={}, url='', method='get'}) => {
  const headers = {
    Authorization: `bearer ${getUserSessionToken()}`
  }

  return axios({
    baseURL: apiBaseUrl,
    method,
    url,
    data: body,
    headers
  })
}
