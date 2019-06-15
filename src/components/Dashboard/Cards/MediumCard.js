import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'


const styles = {
  card: {
    width: '400px',
    margin: '10px 0px',
  },
  cardContent: {
    paddingBottom: '16px !important',
  },
  title: {
    color: 'gray',
    marginBottom: '15px',
  }
}

const MediumCard = props => (
  <Card className={props.classes.card}>
    <CardContent className={props.classes.cardContent}>
      { props.title &&
        <div className={props.classes.title}>{props.title}</div>
      }
      { props.children }
    </CardContent>
  </Card>
)

MediumCard.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.object.isRequired,
  title: PropTypes.string
}

export default withStyles(styles)(MediumCard)
