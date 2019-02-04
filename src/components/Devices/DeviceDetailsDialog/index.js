import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'

import DaysSwitches from './DaysSwitches'
import TimeFields from './TimeFields'
import {
  fetchDeviceSchedule
} from '../../../services/devices'

const styles = {
  content: {width: '500px'},
  deviceDetailsContainer: {
    marginBottom: '20px'
  },
  developerIdLabel: {
    float: 'left',
    marginRight: '50px'
  }
}

const DetailsContent = (props) => {
  if (props.isLoading) return <CircularProgress />
  return (
    <React.Fragment>
      <Divider />
      <div style={{marginTop: '20px'}}>
        <div>Schedule sprinkles</div>
        <div>
          <DaysSwitches
            sprinkleSchedule={props.sprinkleSchedule}
            setSelectedDay={props.setSelectedDay}
          />
          <TimeFields
            sprinkleSchedule={props.sprinkleSchedule}
            setSelectedTime={props.setSelectedTime}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

const DeviceDetailsDialog = props => {
  const { device, open, handleClose, classes } = props
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Your device {device.name}</DialogTitle>
      <DialogContent className={classes.content}>
        <div className={classes.deviceDetailsContainer}>
          <div className={classes.developerIdLabel}>DeveloperId</div>
          <div>{device.unique_id}</div>
        </div>
        <DetailsContent {...props} />
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={props.dialogDefaults}>
          Reset
        </Button>
        <Button color='primary' onClick={props.updateScheduling}>
          Update
        </Button>
          <Button onClick={props.handleClose} color='secondary'>
            Close
          </Button>
      </DialogActions>
    </Dialog>
  )
}

 export default withStyles(styles)(DeviceDetailsDialog)
