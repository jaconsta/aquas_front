import React from 'react'
import { map } from 'lodash'

import Switch from '@material-ui/core/Switch'

import {
  DaySwitchesContainer,
  DaySelectColumn
} from './styled'

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const DaysSwitches = props => {
  return (
    <DaySwitchesContainer>
      {map(DAYS, day => (
        <DaySelectColumn key={day}>
          <span>{day.slice(0,3)}</span>
            <Switch
              checked={props.sprinkleSchedule[day]}
              onChange={props.setSelectedDay(day)}
              value={day}
            />
        </DaySelectColumn>
      ))}
    </DaySwitchesContainer>
  )
}

export default DaysSwitches
