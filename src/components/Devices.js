import _ from 'lodash'
import React from 'react'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

export default class Devices extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openAddDeviceDialog: false,
      openDeviceDetailsDialog: false,
      selectedDeviceId: null,
      deviceName: ''
    }
  }

  getDevices = () => [
    {id: 1, name: 'primer', developerId: 'ASDF1234gjkk', status: 'active', working: 'ok'},
    {id: 2, name: 'second', developerId: 'XDB9876dgjkk', status: 'disabled', working: 'ok'}
  ]

  getDevice = (id) => _.find(this.getDevices(), {id})

  renderToolbar() {
    return (
      <Toolbar>
        Actual devices
      </Toolbar>
    )
  }

  showAddDeviceDialog = () => {
    this.setState({openAddDeviceDialog: true})
  }

  hideAddDeviceDialog = () => {
    this.setState({openAddDeviceDialog: false})
  }

  showDeviceDetailsDialog = (deviceId) => {
    this.setState({openDeviceDetailsDialog: true, selectedDeviceId: deviceId})
  }

  hideDeviceDetailsDialog = () => {
    this.setState({openDeviceDetailsDialog: false, selectedDeviceId: null})
  }

  setSelectedDay = (day) => (event) => {
    console.log('setSelectedDay => ', day, event.target.checked)
  }

  setSelectedTime = (field) => (event) => {
    console.log('setSelectedTime =>', field, event.target.value)
  }

  setDeviceName = (e) => {
    this.setState({deviceName: e.target.value})
  }
  addNewDevice = () => {
    console.log('New Device!')
  }

  renderDaysSwitched = () => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    return (
      <FormGroup row>
        {_.map(days, day => (
          <FormControlLabel 
            key={day} 
            control={
              <Switch 
                checked={false}
                onChange={this.setSelectedDay(day)}
                value={day}
              />
            }
            label={day}
          />
        ))}
      </FormGroup>
    )
  }

  renderTimeFields = () => {
    const options = [
      {name: 'hour', options: _.range(0, 12)},
      {name: 'minutes', options: _.range(0, 60)},
      {name: 'timeFormat', options: ['am', 'pm']},
    ]
    const fieldStyle = {
      width: '100px'
    }
    return (
      <div>
        {_.map(options, formField => (
          <FormControl key={formField.name}  style={fieldStyle}>
            <InputLabel>{_.upperFirst(formField.name)}</InputLabel>
            <Select
              value={''}
              onChange={this.setSelectedTime(formField.name)}
            >
              {_.map(formField.options, option => (
                <MenuItem
                  key={option}
                  value={option}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
        </FormControl>

        ))}
      </div>
    )
  }

  renderAddDeviceDialog = () => {
    return (
      <Dialog
        open={this.state.openAddDeviceDialog}
        onClose={this.hideAddDeviceDialog}
      >
        <DialogTitle>New Device</DialogTitle>
        <DialogContent style={{width: '400px'}}>
          <form>
            <TextField 
              id='deviceName'
              label='name'
              value={this.state.deviceName}
              onChange={this.setDeviceName}
              margin='normal'
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.hideAddDeviceDialog} color='secondary'>
            Close
          </Button>
          <Button onClick={this.addNewDevice} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderDeviceDialog = () => {
    const device = this.getDevice (this.state.selectedDeviceId)
    if (_.isNil(device)) return null
    return (
      <Dialog
        open={this.state.openDeviceDetailsDialog}
        onClose={this.hideDeviceDetailsDialog}
      >
        <DialogTitle>Your device {device.name}</DialogTitle>
        <DialogContent style={{width: '600px'}}>
          <div style={{marginBottom: '20px'}}>
            <div style={{float: 'left', marginRight: '50px'}}>DeveloperId</div>
            <div>{device.developerId}</div>
          </div>
          <Divider />
          <div style={{marginTop: '20px'}}>
            <div>Schedule sprinkles</div>
            <div>
              {this.renderDaysSwitched()}
              {this.renderTimeFields()}
            </div>
            <div>
              <Button color='primary'>
                Update
              </Button>
              <Button color='secondary'>
                Reset
              </Button>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.hideDeviceDetailsDialog} color='secondary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderDeviceRow = (device) => {
    const {id, name, status, working} = device
    return (
      <TableRow key={id} onClick={e => this.showDeviceDetailsDialog(id)}>
        <TableCell>{name}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>{working}</TableCell>
      </TableRow>
    )
  }

  renderDevicesTable () {
    const devices = this.getDevices()
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Working</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         { _.map(devices, this.renderDeviceRow)}
        </TableBody>
      </Table>
    )
  }

  renderUserDevices () {
    const style = {
      marginRight: '40px'
    }

    return (
      <Paper style={style}>
        {this.renderToolbar()}
        {this.renderDevicesTable()}
      </Paper>
    )
  }

  renderAddDevice () {
    const style = {
      width: '300px',
      height: '50px',
      textAlign: 'center',
      marginBottom: '20px'
    }
    return (
      <Button onClick={this.showAddDeviceDialog} style={style} variant='contained' color='primary'>
        + Add Device
      </Button>
    )
  }

  render () {
    return (
      <div>
        <h1>My devices</h1>
        {this.renderAddDevice()}
        {this.renderUserDevices()}
        {this.renderAddDeviceDialog()}
        {this.renderDeviceDialog()}
      </div>
    )
  }
}