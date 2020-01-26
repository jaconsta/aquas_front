import { apiRequest } from './requests'

const DEVICES_URL = 'devices/'
const HEARTBEAT_URL = 'devices_heartbeat/'
const SPRINKLE_URL = 'sprinkles/'

export const fetchDeviceCount = async () => {
    const { data } = await apiRequest({ url: `${DEVICES_URL}count/` })
    return data
}

export const fetchDevices = async () => {
    const { data } = await apiRequest({url: DEVICES_URL})
    return data
}

export const addDevice = async (body) => {
  return apiRequest({url: DEVICES_URL, method: 'post', body})
}


const getSprinklePath = deviceId => `${DEVICES_URL}${deviceId}/${SPRINKLE_URL}`

export const setDeviceSchedule = async (body) => {
  const { deviceId } = body
  return apiRequest({ url: getSprinklePath(deviceId), method: 'post', body })
}

export const fetchDeviceSchedule = async (deviceId) => {
  const { data } = await apiRequest({ url: getSprinklePath(deviceId) })
  return data
}

export const setSprinkleNow = (deviceId) => {
  const url = `${getSprinklePath(deviceId)}now/`
  return apiRequest({ url, method: 'post' })
}

export const fetchDeviceLastHeartbeats = async () => {
  const { data } = await apiRequest({url: `${HEARTBEAT_URL}latest/`})
  return data
}

export const fetchDeviceDailySprinkles = async () => {
  const { data } = await apiRequest({url: `${HEARTBEAT_URL}daily_sprinkles/`})
  return data
}

export const fetchDeviceActives = async () => {
  const { data } = await apiRequest({url: `${HEARTBEAT_URL}active_devices/`})
  return data
}
