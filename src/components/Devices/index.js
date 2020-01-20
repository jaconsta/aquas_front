import _ from 'lodash'
import React, { Component } from 'react'

import Snackbar from '@material-ui/core/Snackbar'

import AddDevice from './AddDevice'
import DeviceDetailsDialog from './DeviceDetailsDialog'
import UserDevicesTable from './UserDevicesTable'
import {
  fetchDevices,
  addDevice,
  setDeviceSchedule,
  fetchDeviceSchedule,
  setSprinkleNow,
  fetchDeviceLastHeartbeats,
} from '../../services/devices'

const sprinkleDefaults = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
  hour: 0, minute: 0,
  am_pm: 'am',
  nextSchedule: null
}

const deviceDetailsDefault = {
  isLoading: false,
  open: false,
  deviceId: null,
  sprinkleSchedule: {
    ...sprinkleDefaults
  },
  initialSchedule: {
    ...sprinkleDefaults
  }
}

export default class Devices extends Component {
  constructor (props) {
    super(props)
    const latestUpdate = new Date().getTime()
    this.state = {
      devices: [],
      heartbeats: {},
      selectedDeviceId: null,
      deviceDetails: {
        ...deviceDetailsDefault
      },
      snackbarMessage: '',
      snackbarOpen: false,
      latestUpdate,
    }
  }

  componentDidMount () {
    this.fetchDevices()
    this.fetchDeviceHeartbeats()
    this.scheduleUpdateDeviceHeartbeats()
  }

  fetchDevices = async () => {
    const devices = await fetchDevices()
    this.setState({devices})
  }

  fetchDeviceHeartbeats = async () => {
    const heartbeats = await fetchDeviceLastHeartbeats()
    const latestUpdate = new Date().getTime()
    this.setState({ heartbeats: heartbeats, latestUpdate })
  }

  fetchDeviceSprinkle = async (deviceId) => {
    try {
        const schedule = await fetchDeviceSchedule(deviceId)
        const {deviceDetails} = this.state
        this.setState({
          deviceDetails: {
            ...deviceDetails,
            sprinkleSchedule: schedule,
            isLoading: false
          }
        })
    } catch (e) {
      this.resetDetailsDialogToDefaults()
    }
  }

  scheduleUpdateDeviceHeartbeats = () => {
    // Should use a socket io connection.
    const fiveMinutes = 300000
    setInterval(this.fetchDeviceHeartbeats, fiveMinutes)
  }

  getDevice = (id) => _.chain(this.state.devices).find({id}).defaultTo({}).value()

  postDevice = async (name) => {
    try {
      await addDevice({ name })
      this.fetchDevices()
      return true // processed
    } catch (e) {
      this.showSnackbar('Could not save device.')
    }
  }

  // User Devices actions
  setSprinkleNow = (deviceId) => async () => {
    try {
      await setSprinkleNow(deviceId)
      this.showSnackbar('Sprinkle programmed')
    } catch (e) {
      this.showSnackbar('Could not send it.')
    }
  }

  // Device details dialog actions
  resetDetailsDialogToDefaults = () => {
    const {deviceDetails} = this.state
    this.setState({
      deviceDetails: {
        ...deviceDetails,
        isLoading: false,
        sprinkleSchedule: {...deviceDetails.initialSchedule}
      }
    })
  }
  showDeviceDetailsDialog = (deviceId) => {
    const { deviceDetails } = this.state
    this.setState({ deviceDetails: {
      ...deviceDetails,
      deviceId,
      open: true,
      isLoading: true
    }})

    this.fetchDeviceSprinkle(deviceId)
  }

  closeDeviceDetailsDialog = () => {
    this.setState({deviceDetails: {...deviceDetailsDefault}})
  }

  setSelectedDay = (day) => (event) => {
    const { deviceDetails } = this.state
    this.setState({ deviceDetails: {
      ...deviceDetails, sprinkleSchedule: {
        ...deviceDetails.sprinkleSchedule,
        [day]: event.target.checked
      }
    }})
  }

  setSelectedTime = (field) => (event) => {
    const { deviceDetails } = this.state
    this.setState({ deviceDetails: {
      ...deviceDetails, sprinkleSchedule: {
        ...deviceDetails.sprinkleSchedule,
        [field]: event.target.value
      }
    }})
  }

  updateScheduling = async () => {
    const { sprinkleSchedule, deviceId } = this.state.deviceDetails
    try {
      await setDeviceSchedule({...sprinkleSchedule, device: deviceId})
    } catch (e) {
      this.showSnackbar('Could not update schedule.')
    }
    this.closeDeviceDetailsDialog()
  }

  showSnackbar = (snackbarMessage) => {
    this.setState({snackbarOpen: true, snackbarMessage})
  }

  handleSnackbarClose = () => {
    this.setState({snackbarOpen: false, snackbarMessage: ''})
  }

  renderErrorNotification () {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={this.state.snackbarOpen}
        onClose={this.handleSnackbarClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        style={{top: '90px'}}
        message={<span id="message-id">{this.state.snackbarMessage}</span>}
      />
    )
  }

  getDevicesTableProps() {
    return {
      devices: this.state.devices,
      heartbeats: this.state.heartbeats,
      showDeviceDetailsDialog: this.showDeviceDetailsDialog,
      setSprinkleNow: this.setSprinkleNow
    }
  }

  getDeviceDetailsProps() {
    return {
      ...this.state.deviceDetails,
      device: this.getDevice(this.state.deviceDetails.deviceId),
      setSelectedDay: this.setSelectedDay,
      setSelectedTime: this.setSelectedTime,
      handleClose: this.closeDeviceDetailsDialog,
      updateScheduling: this.updateScheduling,
      dialogDefaults: this.resetDetailsDialogToDefaults
    }
  }

  render () {
    return (
      <div>
        <h1>My devices</h1>
        <UserDevicesTable {...this.getDevicesTableProps()} />
        <AddDevice onSubmit={this.postDevice} />
        <DeviceDetailsDialog {...this.getDeviceDetailsProps()} />
        {this.renderErrorNotification()}
      </div>
    )
  }
}
