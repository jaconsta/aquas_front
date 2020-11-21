import React from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import { TableHeadResponsive } from './styled'

const DeviceTableHeader = props => {
	return (
    <TableHeadResponsive>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox />
        </TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Last sprinkle</TableCell>
        <TableCell>Water Now</TableCell>
      </TableRow>
    </TableHeadResponsive>
  )
}

export default DeviceTableHeader
