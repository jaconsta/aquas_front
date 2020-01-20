import React from 'react'
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import Fab from '@material-ui/core/Fab'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import PinIcon from '@material-ui/icons/PinDrop'

import { DeviceNameContainer } from './styled'

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

const isDeviceOnline = heartbeat => {
  const beat = _.get(heartbeat, 'connection_time')
  if(_.isNil(beat)) return null

  const beatDate = (new Date(beat)).getTime()
  const now = (new Date()).getTime()
  const fiveMinutes = 300000

  const dateDiff = now - beatDate
  return dateDiff < fiveMinutes
}

const deviceDotClassname = heartbeat => {
  const deviceOnline = isDeviceOnline(heartbeat)
  if (_.isNil(deviceOnline)) return 'dotUnknown'
  if (deviceOnline) return 'dotActive'
  return 'dotOffline'
}

const getSprinkleDate = sprinkle => {
  const sprinkleTime = _.get(sprinkle, 'connection_time')
  if(_.isNil(sprinkleTime)) return '-'

  const sprinkleDate = (new Date(sprinkleTime)).getTime()
  return (new Date(sprinkleDate)).toISOString().slice(0, 16).replace('T', ' ')
}

const DeviceRow = props => {
  const {id, name} = props.device
  const isOnline = deviceDotClassname(props.heartbeat)
  const lastSprinkle = getSprinkleDate(props.sprinkle)

  return (
    <TableRow key={id}>
      <TableCell padding="checkbox">
        <Checkbox />
      </TableCell>
      <TableCell className={props.classes.deviceName} onClick={e => props.showDeviceDetailsDialog(id)}>
        <DeviceNameContainer>
          <span className={`${props.classes.dot} ${props.classes[isOnline]}`}></span>
          {name}
        </DeviceNameContainer>
      </TableCell>
      <TableCell>{lastSprinkle}</TableCell>
      <TableCell>
        <Fab size="small" color="default" onClick={props.setSprinkleNow(id)}  aria-label="Run">
          <PinIcon color='primary' className={props.classes.pinIcon} />
        </Fab>
      </TableCell>
    </TableRow>
  )
}

export default withStyles(styles)(DeviceRow)
