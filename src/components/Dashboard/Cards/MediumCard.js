import React from 'react'
import PropTypes from 'prop-types'

import {
  MediumSizeCard,
  MediumSizeCardContent,
  Title
} from './styled'

const MediumCard = props => (
  <MediumSizeCard>
    <MediumSizeCardContent>
      { props.title &&
        <Title>{props.title}</Title>
      }
      { props.children }
    </MediumSizeCardContent>
  </MediumSizeCard>
)

MediumCard.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.object.isRequired,
  title: PropTypes.string
}

export default MediumCard
