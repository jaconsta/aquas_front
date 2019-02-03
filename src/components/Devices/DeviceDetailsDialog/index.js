import React, { Component } from 'react'
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'

import DaysSwitches from './DaysSwitches'
import TimeFields from './TimeFields'
import { 
  fetchDeviceSchedule
} from '../../../services/devices'

const styles = {}

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

class DeviceDetailsDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deviceId: null,
      sprinkleSchedule: {
        ...sprinkleDefaults
      }
    }
  }

  componentDidUpdate () {
    if (this.shouldFetchDevice()) this.getDeviceSprinkle()
  }

  shouldFetchDevice = () => {
    const deviceId =  _.get(this.props, 'device.id')
    return (
      deviceId !== this.state.deviceId
    )
  }

  getDeviceSprinkle = async () => {
    const deviceId = _.get(this.props, 'device.id')
    if (_.isNil(deviceId)) return this.setSprinkleDefaults()
    try {
      const sprinkleSchedule = await fetchDeviceSchedule(deviceId)
      this.setState({sprinkleSchedule, deviceId})
    } catch (e) {
      this.setSprinkleDefaults(deviceId)
    }
  }

  setSprinkleDefaults = (deviceId=null) => {
    this.setState( {sprinkleSchedule: {...sprinkleDefaults}, deviceId} )
  }
  setSelectedDay = day => e => {
    this.setState({sprinkleSchedule: {...this.state.sprinkleSchedule, [day]: e.target.checked}})
  }

  setSelectedTime = day => e => {
    this.setState({sprinkleSchedule: {...this.state.sprinkleSchedule, [day]: e.target.value}})
  }

  render() {
    const { device } = this.props

    if (_.isNil(device)) return null
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
      >
        <DialogTitle>Your device {device.name}</DialogTitle>
        <DialogContent style={{width: '600px'}}>
          <div style={{marginBottom: '20px'}}>
            <div style={{float: 'left', marginRight: '50px'}}>DeveloperId</div>
            <div>{device.unique_id}</div>
          </div>
          <Divider />
          <div style={{marginTop: '20px'}}>
            <div>Schedule sprinkles</div>
            <div>
              <DaysSwitches 
                sprinkleSchedule={this.state.sprinkleSchedule}
                setSelectedDay={this.setSelectedDay}
              />
              <TimeFields 
                sprinkleSchedule={this.state.sprinkleSchedule}
                setSelectedTime={this.setSelectedTime}
              />
            </div>
            <div>
              <Button color='primary' onClick={this.props.updateScheduling}>
                Update
              </Button>
              <Button color='secondary' onClick={this.props.dialogDefaults}>
                Reset
              </Button>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color='secondary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

 export default withStyles(styles)(DeviceDetailsDialog)