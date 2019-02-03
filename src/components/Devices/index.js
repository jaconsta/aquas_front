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

export default class Devices extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      devices: [],
      openDeviceDetailsDialog: false,
      selectedDeviceId: null,
      addNewDialog: {
        ...defaultAddNew
      },
      sprinkleSchedule: {
        monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false,
        hour: 0, minute: 0, am_pm: 'am'
      },
      snackbarMessage: '',
      snackbarOpen: false
    }
  }

  dialogDefaults = () => {
    this.setState({
      sprinkleSchedule: {
        monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false,
        hour: 0, minute: 0, am_pm: 'am'
      }
    })
  }
  componentDidMount () {
    this.fetchDevices()
  }

  fetchDevices = async () => {
    const devices = await fetchDevices()
    this.setState({devices})
  }

  fetchDeviceSprinkle = async () => {
    const { selectedDeviceId } = this.state
    try {
        const schedule = await fetchDeviceSchedule(selectedDeviceId)
        this.setState({sprinkleSchedule: schedule})
    } catch (e) {
      this.dialogDefaults()
    }
  }

  getDevice = (id) => _.find(this.state.devices, {id})


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
      console.log('could not save device.')
    }
  }

  // User Devices actions


  // Device details
  showDeviceDetailsDialog = (deviceId) => {
    this.setState({openDeviceDetailsDialog: true, selectedDeviceId: deviceId}, this.fetchDeviceSprinkle)
  }

  closeDeviceDetailsDialog = () => {
    this.setState({openDeviceDetailsDialog: false, selectedDeviceId: null})
  }

  setSelectedDay = (day) => (event) => {
    const { sprinkleSchedule } = this.state
    console.log(sprinkleSchedule)
    this.setState({sprinkleSchedule: {...sprinkleSchedule, [day]: event.target.checked}})
  }

  setSelectedTime = (field) => (event) => {
    const { sprinkleSchedule } = this.state
    this.setState({sprinkleSchedule: {...sprinkleSchedule, [field]: event.target.value}})
  }

  showSnackbar = (snackbarMessage) => {
    this.setState({snackbarOpen: true, snackbarMessage})
  }

  handleSnackbarClose = () => {
    this.setState({snackbarOpen: false, snackbarMessage: ''})
  }

  setSprinkleNow = (deviceId) => async () => {
    try {
      await setSprinkleNow(deviceId)
      this.showSnackbar('Sprinkle programmed')
    } catch (e) {
      this.showSnackbar('Could not send it.')
    }
  }

  updateScheduling = async () => {
    const { sprinkleSchedule, selectedDeviceId } = this.state
    console.log('updateScheduling', sprinkleSchedule)
    await setDeviceSchedule({...sprinkleSchedule, device: selectedDeviceId})
    this.closeDeviceDetailsDialog()
  }

  // renderDaysSwitched = () => {
  //   const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  //   return (
  //     <FormGroup row>
  //       {_.map(days, day => (
  //         <FormControlLabel
  //           key={day}
  //           control={
  //             <Switch
  //               checked={this.state.sprinkleSchedule[day]}
  //               onChange={this.setSelectedDay(day)}
  //               value={day}
  //             />
  //           }
  //           label={day}
  //         />
  //       ))}
  //     </FormGroup>
  //   )
  // }

  // renderTimeFields = () => {
  //   const options = [
  //     {name: 'hour', options: _.range(0, 12)},
  //     {name: 'minute', options: _.range(0, 60)},
  //     {name: 'am_pm', options: ['am', 'pm']},
  //   ]
  //   const fieldStyle = {
  //     width: '100px'
  //   }
  //   return (
  //     <div>
  //       {_.map(options, formField => (
  //         <FormControl key={formField.name}  style={fieldStyle}>
  //           <InputLabel>{_.upperFirst(formField.name)}</InputLabel>
  //           <Select
  //             value={this.state.sprinkleSchedule[formField.name]}
  //             onChange={this.setSelectedTime(formField.name)}
  //           >
  //             {_.map(formField.options, option => (
  //               <MenuItem
  //                 key={option}
  //                 value={option}
  //               >
  //                 {option}
  //               </MenuItem>
  //             ))}
  //           </Select>
  //       </FormControl>

  //       ))}
  //     </div>
  //   )
  // }

  // renderDeviceDialog = () => {
  //   const device = this.getDevice (this.state.selectedDeviceId)
  //   if (_.isNil(device)) return null
  //   return (
  //     <Dialog
  //       open={this.state.openDeviceDetailsDialog}
  //       onClose={this.closeDeviceDetailsDialog}
  //     >
  //       <DialogTitle>Your device {device.name}</DialogTitle>
  //       <DialogContent style={{width: '600px'}}>
  //         <div style={{marginBottom: '20px'}}>
  //           <div style={{float: 'left', marginRight: '50px'}}>DeveloperId</div>
  //           <div>{device.unique_id}</div>
  //         </div>
  //         <Divider />
  //         <div style={{marginTop: '20px'}}>
  //           <div>Schedule sprinkles</div>
  //           <div>
  //             {this.renderDaysSwitched()}
  //             {this.renderTimeFields()}
  //           </div>
  //           <div>
  //             <Button color='primary' onClick={this.updateScheduling}>
  //               Update
  //             </Button>
  //             <Button color='secondary' onClick={this.dialogDefaults}>
  //               Reset
  //             </Button>
  //           </div>
  //         </div>
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={this.closeDeviceDetailsDialog} color='secondary'>
  //           Close
  //         </Button>
  //       </DialogActions>
  //     </Dialog>
  //   )
  // }

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
      device: this.getDevice(this.state.selectedDeviceId),
      open: this.state.openDeviceDetailsDialog,
      handleClose: this.closeDeviceDetailsDialog
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
