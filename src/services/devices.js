import { apiRequest } from './requests'

export const fetchDeviceCount = async () => {
    const { data } = await apiRequest({url: 'my_devices/device_count/'})
    return data
}

export const fetchDevices = async () => {
    const { data } = await apiRequest({url: 'devices/'})
    return data
}

export const addDevice = async (body) => {
  return apiRequest({url: 'devices/', method: 'post', body})
}

export const setDeviceSchedule = async (body) => {
  return apiRequest({url: 'devices_sprinkle/', method: 'post', body})
}

export const fetchDeviceSchedule = async (deviceId) => {
  const { data } = await apiRequest({url: `devices_sprinkle/${deviceId}/`})
  return data
}

export const setSprinkleNow = (deviceId) => {
  return apiRequest({url: `devices_sprinkle/${deviceId}/now/`, method: 'post'})
}
