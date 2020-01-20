import React from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const DeviceTableHeader = props => {
	return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox />
        </TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Last sprinkle</TableCell>
        <TableCell>Water Now</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default DeviceTableHeader
