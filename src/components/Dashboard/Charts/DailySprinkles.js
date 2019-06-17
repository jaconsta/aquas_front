import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const styles = {
  lineChart: {
    fontSize: '0.6em',
    left: '-30px',
  }
}

const DailySprinkles = props => (
  <ResponsiveContainer  width='99%' height={250}>
    <LineChart
      className={props.classes.lineChart}
      data={props.data}
      margin={
        { top: 5,right: 5, left: 5, bottom: 5, }
      }
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" interval={5} />
      <YAxis interval={1}/>
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="sprinkles" fill="#8884d8" name="sprinkles" />
    </LineChart>
  </ResponsiveContainer>
)

DailySprinkles.propTypes = {
  data: PropTypes.array
}

export default withStyles(styles)(DailySprinkles)
