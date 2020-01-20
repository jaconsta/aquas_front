import React from 'react'

import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'

import { AddDevicebuttonStyled } from './styled'

const AddDeviceButton = props => {
  return (
    <AddDevicebuttonStyled>
      <FormControl fullWidth>
        <Button onClick={props.onClick} variant='contained' color='primary'>
          + Add Device
        </Button>
      </FormControl>
    </AddDevicebuttonStyled>
    )
}

export default AddDeviceButton
