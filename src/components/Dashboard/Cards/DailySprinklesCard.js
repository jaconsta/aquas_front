import React from 'react'
import PropTypes from 'prop-types'

import MediumCard from './MediumCard'
import DailySprinkles from '../Charts/DailySprinkles'


const DailySprinklesCard = props => (
  <MediumCard title={props.title}>
    <DailySprinkles data={props.data} />
  </MediumCard>
)


DailySprinklesCard.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
}


export default DailySprinklesCard
