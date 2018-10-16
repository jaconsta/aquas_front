import axios from 'axios'

import { apiRequest } from './requests'

export const fetchDeviceCount = async () => {
    const { data } = await apiRequest({url: 'my_devices/device_count/'})
    return data
}


export const fetchDevices = async () => {
    const { data } = await apiRequest({url: 'devices/'})
    return data
}
