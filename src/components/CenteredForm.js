import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'

import pomelo_logo from '../static/images/pomelo_logo.png';

const styles = {
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
  },
  paper: {
    marginTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '600px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  logo: {
    marginTop: '20px',
    maxWidth: '180px',
  },
  formHeader: {
    textAlign: 'center'
  }
}

const renderErrorSnackbar = props => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={props.open}
      onClose={props.handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{props.message}</span>}
    />
  )
}

class CenteredForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      errorSnackbar: {
        open: false,
        message: ''
      }
    }
  }

  handleSnackbarClose = () => {
    const errorSnackbar = {
      open: false,
      message: ''
    }
    this.setState({ errorSnackbar })
  }

  showErrorSnackbar = message => {
    const errorSnackbar = {
      open: true,
      message
    }
    this.setState({ errorSnackbar })
  }

  setTitle = title => {
    this.setState({ title })
  }


  render () {
    const { Children, classes } = this.props

    return (
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <div>
            <div className={classes.formHeader}>
              <img alt="Pomelo logo" className={classes.logo} src={pomelo_logo} />
              <h1 className={classes.title}>{this.state.title}</h1>
            </div>
            <Children setTitle={this.setTitle} showErrorSnackbar={this.showErrorSnackbar} history={this.props.history}/>
          </div>
        </Paper>
        {renderErrorSnackbar({handleClose: this.handleSnackbarClose, ...this.state.errorSnackbar})}
      </div>
    )
  }
}

export default withStyles(styles)(CenteredForm)
