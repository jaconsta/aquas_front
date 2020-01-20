import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'

import AddDeviceButton from './AddDeviceButton'
import {
  AddDeviceForm,
  DeviceNameField,
  ActionButtonsContainer,
  EmptySpace,
} from './styled'

const NewDeviceForm = props => (
  <AddDeviceForm onSubmit={props.onSubmit}>
    <DeviceNameField
      id='deviceName'
      label='name'
      value={props.name}
      onChange={props.onChange}
      margin='normal'
    />
    <ActionButtonsContainer>
      <Button color="primary" type="submit">Create</Button>
      <Button color="secondary" onClick={props.onCancel}>Cancel</Button>
    </ActionButtonsContainer>
    <EmptySpace />
  </AddDeviceForm>
)

NewDeviceForm.propTypes = {
  onSubmit: PropTypes.func,
  name: PropTypes.string,
  onchange: PropTypes.func,
  onCancel: PropTypes.func,
}

const AddDevice = props => {
  const [ isExpanded, setIsExpanded ] = useState(false)
  const [ name, setName ] = useState('')

  const showAddDeviceForm = () => setIsExpanded(true)
  const closeForm = () => {
      setName('')
      setIsExpanded(false)
  }
  const handleChange = e => {
      setName(e.target.value)
  }
  const createDevice = async e => {
    e.preventDefault()
    const processed = await props.onSubmit(name)
    if(processed) closeForm()
  }

  if (!isExpanded) return ( <AddDeviceButton onClick={showAddDeviceForm}/> )

  return (<NewDeviceForm onSubmit={createDevice} onChange={handleChange} name={name} onCancel={closeForm} />)
}



export default AddDevice
