import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import AddIcon from '@material-ui/icons/Add'

const styles = {
  deviceName: {
    color:'green',
    textDecorationLine: 'underline',
    fontWeight: '500',
    '&:hover': {
      fontSize: '0.9em',
      cursor: 'pointer'
    }
  }
}
const DeviceRow = props => {
  const {id, name, status, working} = props.device
  return (
    <TableRow key={id}>
      <TableCell padding="checkbox">
        <Checkbox />
      </TableCell>
      <TableCell className={props.classes.deviceName} onClick={e => props.showDeviceDetailsDialog(id)}>{name}</TableCell>
      <TableCell>{status === 'act' ? 'active': 'disabled'}</TableCell>
      <TableCell>{working}</TableCell>
      <TableCell>
        <Button variant="fab" mini color="secondary" onClick={props.setSprinkleNow(id)}  aria-label="Run">
        <AddIcon />
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default withStyles(styles)(DeviceRow)