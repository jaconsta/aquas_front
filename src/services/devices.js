import { apiRequest } from './requests'

const DEVICES_URL = 'devices/'
const HEARTBEAT_URL = 'devices_heartbeat/'
const SPRINKLE_URL = 'devices_sprinkle/'

export const fetchDeviceCount = async () => {
    const { data } = await apiRequest({url: 'my_devices/device_count/'})
    return data
}

export const fetchDevices = async () => {
    const { data } = await apiRequest({url: DEVICES_URL})
    return data
}

export const addDevice = async (body) => {
  return apiRequest({url: DEVICES_URL, method: 'post', body})
}

export const setDeviceSchedule = async (body) => {
  return apiRequest({url: SPRINKLE_URL, method: 'post', body})
}

export const fetchDeviceSchedule = async (deviceId) => {
  const { data } = await apiRequest({url: `${SPRINKLE_URL}${deviceId}/`})
  return data
}

export const setSprinkleNow = (deviceId) => {
  return apiRequest({url: `${SPRINKLE_URL}${deviceId}/now/`, method: 'post'})
}

export const fetchDeviceLastHeartbeats = async () => {
  const { data } = await apiRequest({url: `${HEARTBEAT_URL}latest/`})
  return data
}
