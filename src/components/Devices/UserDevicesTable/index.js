import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'

import DeviceToolbar from './DeviceToolbar'
import DeviceTableHeader from './DeviceTableHeader'
import DeviceRow from './DeviceRow'
import { TableResponsiveChunks } from './styled'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    [theme.breakpoints.up('md')]: {
      marginRight: '40px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    }
  },
  table: {
  },
})

const NoDevicesMessage = () => (
  <div>
    Oh no! This looks a bit empty, start by adding your first device!
  </div>
)

const UserDevices = props => {
  if (_.isEmpty(props.devices)) return <NoDevicesMessage />

  const deviceProps = device => ({
    device,
    heartbeat: _.find(props.heartbeats, {device: device.id, connection_status: 'heartbeat'}),
    sprinkle: _.find(props.heartbeats, {device: device.id, connection_status: 'sprinkle'}),
    showDeviceDetailsDialog: props.showDeviceDetailsDialog,
    setSprinkleNow: props.setSprinkleNow,
  })

  return (
    <Paper className={props.classes.paper}>
      <DeviceToolbar />
      <TableResponsiveChunks className={props.classes.table}>
        <DeviceTableHeader />
        <TableBody>
         { _.map(props.devices, device => <DeviceRow key={device.id} {...deviceProps(device)} />) }
        </TableBody>
      </TableResponsiveChunks>
    </Paper>
  )
}

UserDevices.propTypes = {
  devices: PropTypes.array,
}

export default withStyles(styles)(UserDevices)
