import React from 'react'
import _ from 'lodash'

import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const TimeFields = props => {
  const options = [
    {name: 'hour', options: _.range(0, 12)},
    {name: 'minute', options: _.range(0, 60, 5)},
    {name: 'am_pm', options: ['am', 'pm']},
  ]
  const fieldStyle = {
    width: '100px'
  }
  return (
    <div>
      {_.map(options, formField => (
        <FormControl key={formField.name}  style={fieldStyle}>
          <InputLabel>{_.upperFirst(formField.name)}</InputLabel>
          <Select
            value={props.sprinkleSchedule[formField.name]}
            onChange={props.setSelectedTime(formField.name)}
          >
            {_.map(formField.options, option => (
              <MenuItem
                key={option}
                value={option}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
      </FormControl>

      ))}
    </div>
  )

}

export default TimeFields
