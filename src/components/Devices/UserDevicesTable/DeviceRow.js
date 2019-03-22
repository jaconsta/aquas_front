import React from 'react'
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import PinIcon from '@material-ui/icons/PinDrop'

const styles = {
  deviceName: {
    color:'green',
    textDecorationLine: 'underline',
    fontWeight: '500',
    '&:hover': {
      fontSize: '0.9em',
      cursor: 'pointer'
    }
  },
  pinIcon: {
    transform: 'rotate(180deg)'
  },
  dot: {
    height: '25px',
    width: '25px',
    backgroundColor: '#bbb',
    borderRadius: '50%',
    display: 'inline-block'
  },
  dotActive: {
    backgroundColor: 'green'
  },
  dotOffline: {
    backgroundColor: 'red'
  }
}

const getTimezoneOffset = () => (new Date().getTimezoneOffset()) * 60000

const isDeviceOnline = heartbeat => {
  const beat = _.get(heartbeat, 'connection_time')
  if(_.isNil(beat)) return false

  const beatDate = (new Date(beat)).getTime() + getTimezoneOffset()
  const now = (new Date()).getTime()
  const fiveMinutes = 300000

  const dateDiff = now - beatDate
  return dateDiff < fiveMinutes
}

const getSprinkleDate = sprinkle => {
  const sprinkleTime = _.get(sprinkle, 'connection_time')
  if(_.isNil(sprinkleTime)) return '-'

  const sprinkleDate = (new Date(sprinkleTime)).getTime() + getTimezoneOffset()
  return sprinkleTime.slice(0, 19).replace('T', ' ')  // (new Date(sprinkleDate)).toISOString().slice(0, 19).replace('T', ' ')
}

const DeviceRow = props => {
  const {id, name} = props.device
  const isOnline = isDeviceOnline(props.heartbeat) ? 'dotActive' : 'dotOffline'
  const lastSprinkle = getSprinkleDate(props.sprinkle)

  return (
    <TableRow key={id}>
      <TableCell padding="checkbox">
        <Checkbox />
      </TableCell>
      <TableCell className={props.classes.deviceName} onClick={e => props.showDeviceDetailsDialog(id)}>{name}</TableCell>
      <TableCell>{lastSprinkle}</TableCell>
      <TableCell><span className={`${props.classes.dot} ${props.classes[isOnline]}`}></span></TableCell>
      <TableCell>
        <Button variant="fab" mini color="secondary" onClick={props.setSprinkleNow(id)}  aria-label="Run">
        <PinIcon className={props.classes.pinIcon}/>
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default withStyles(styles)(DeviceRow)
