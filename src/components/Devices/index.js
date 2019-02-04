import _ from 'lodash'
import React from 'react'

import Snackbar from '@material-ui/core/Snackbar'

import AddDeviceButton from './AddDeviceButton'
import AddDeviceDialog from './AddDeviceDialog'
import DeviceDetailsDialog from './DeviceDetailsDialog'
import UserDevicesTable from './UserDevicesTable'
import {
  fetchDevices,
  addDevice,
  setDeviceSchedule,
  fetchDeviceSchedule,
  setSprinkleNow
} from '../../services/devices'

const defaultAddNew = {
  open: false,
  name: ''
}

const sprinkleDefaults = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
  hour: 0, minute: 0,
  am_pm: 'am'
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

export default class Devices extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      devices: [],
      selectedDeviceId: null,
      addNewDialog: {
        ...defaultAddNew
      },
      deviceDetails: {
        ...deviceDetailsDefault
      },
      snackbarMessage: '',
      snackbarOpen: false
    }
  }

  componentDidMount () {
    this.fetchDevices()
  }

  fetchDevices = async () => {
    const devices = await fetchDevices()
    this.setState({devices})
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
      this.dialogDefaults()
    }
  }

  getDevice = (id) => _.chain(this.state.devices).find({id}).defaultTo({}).value()

  // Add device Dialog actions
  showAddDeviceDialog = () => {
    this.setState({addNewDialog: {...this.state.addNewDialog, open: true}})
  }

  closeAddDeviceDialog = () => {
    this.setState({ addNewDialog: {...defaultAddNew} })
  }

  handleChangeAddDevice = (e) => {
    const name = e.target.value
    this.setState({ addNewDialog: {...this.state.addNewDialog, name} })
  }

  postDevice = async () => {
    const { name } = this.state.addNewDialog
    try {
      await addDevice({ name })
      this.closeAddDeviceDialog()
      this.fetchDevices()
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

  getAddNewDialogProps() {
    return {
      ...this.state.addNewDialog,
      handleClose: this.closeAddDeviceDialog,
      handleChange: this.handleChangeAddDevice,
      addNewDevice: this.postDevice
    }
  }

  getDevicesTableProps() {
    return {
      devices: this.state.devices,
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
        <AddDeviceButton onClick={this.showAddDeviceDialog} />
        <AddDeviceDialog {...this.getAddNewDialogProps()}/>
        <UserDevicesTable {...this.getDevicesTableProps()}/>
        <DeviceDetailsDialog {...this.getDeviceDetailsProps()} />
        {this.renderErrorNotification()}
      </div>
    )
  }
}
