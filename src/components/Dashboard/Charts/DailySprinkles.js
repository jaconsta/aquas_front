import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles';
import { LineChart, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const styles = {
  lineChart: {
    fontSize: '0.6em',
    left: '-30px',
  }
}

const DailySprinkles = props => (
  <LineChart
    className={props.classes.lineChart}
    width={400}
    height={250}
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
)

DailySprinkles.propTypes = {
  data: PropTypes.array
}

export default withStyles(styles)(DailySprinkles)
