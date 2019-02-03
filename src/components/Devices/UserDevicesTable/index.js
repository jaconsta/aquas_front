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
    showDeviceDetailsDialog: props.showDeviceDetailsDialog,
    setSprinkleNow: props.setSprinkleNow
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