import React from 'react'
import { map } from 'lodash'

import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const DaysSwitches = props => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  return (
    <FormGroup row>
      {map(days, day => (
        <FormControlLabel
          key={day}
          control={
            <Switch
              checked={props.sprinkleSchedule[day]}
              onChange={props.setSelectedDay(day)}
              value={day}
            />
          }
          label={day}
        />
      ))}
    </FormGroup>
  )

}

export default DaysSwitches