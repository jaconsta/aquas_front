import React from 'react'
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'

import DeviceToolbar from './DeviceToolbar'
import DeviceTableHeader from './DeviceTableHeader'
import DeviceRow from './DeviceRow'

const styles = {
  paper: {
    marginRight: '40px'
  }
}

const UserDevices = props => {
  const deviceProps = device => ({
    device,
    heartbeat: _.find(props.heartbeats, {device: device.id, connection_status: 'heartbeat'}),
    sprinkle: _.find(props.heartbeats, {device: device.id, connection_status: 'sprinkle'}),
    showDeviceDetailsDialog: props.showDeviceDetailsDialog,
    setSprinkleNow: props.setSprinkleNow,
    lastSprinkle: _.find(props.lastSprinkles, { device: device.id })
  })

  return (
    <Paper className={props.classes.paper}>
      <DeviceToolbar />
      <Table>
        <DeviceTableHeader />
        <TableBody>
         { _.map(props.devices, device => <DeviceRow key={device.id} {...deviceProps(device)} />) }
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(UserDevices)
