import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'


// Currently this element is deprecated.
const AddDeviceDialog = props => {
  const handleSubmit = e => {
    e.preventDefault()
    props.addNewDevice()
  }
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>New Device</DialogTitle>
      <DialogContent style={{width: '400px'}}>
        <form onSubmit={handleSubmit}>
          <TextField
            id='deviceName'
            label='name'
            value={props.name}
            onChange={props.handleChange}
            margin='normal'
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color='secondary'>
          Close
        </Button>
        <Button onClick={handleSubmit} type="submit" color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddDeviceDialog
