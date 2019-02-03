import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = {
  button:  {
    width: '300px',
    height: '50px',
    textAlign: 'center',
    marginBottom: '20px'
  }
}

const AddDeviceButton = props => {
  return (
    <Button onClick={props.onClick} className={props.classes.button} variant='contained' color='primary'>
      + Add Device
    </Button>
    )
}

export default withStyles(styles)(AddDeviceButton)