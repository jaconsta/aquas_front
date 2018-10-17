import React from 'react'
import { withRouter } from "react-router-dom"
import axios from 'axios'
import { storeUserCredentials } from '../utils/auth'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'
import TextField from '@material-ui/core/TextField'

import pomelo_logo from '../static/images/pomelo_logo.png';

 class Login extends React.Component {
   constructor (props) {
     super(props)
     this.state = {
       username: '',
       password: '',
       rememberMe: false,
       snackbarOpen: false
     }
   }

   loginWasOk = loginResponse => {
     storeUserCredentials(loginResponse.data)
     this.goToDashboard()
   }

   handleSubmit = (event) => {
     event.preventDefault()
     const { username, password } = this.state
     axios.post('http://localhost:8000/api/auth/login/', {username, password}, {'Access-Control-Allow-Origin': '*'})
      .then(this.loginWasOk)
      .catch(() => this.setState({snackbarOpen: true}))
   }

   handleChange = name => event => {
     this.setState({
       [name]: event.target.value
     })
   }

   handleCheck = name => event => {
     this.setState({
       [name]: event.target.checked
     })
   }

   handleSnackbarClose = () => {
     this.setState({snackbarOpen: false})
   }

   goToRegister = () => {
     const { history } = this.props
     history.push("register")
   }

   goToDashboard = () => {
     const { history } = this.props
     history.push("dashboard")
   }


   render () {
    const layoutStyle = {
      width: 'auto',
      display: 'block', // Fix IE11 issue.
    }
    const paperStyle = {
      marginTop: '100px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '600px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
    const imageStyle = {
      marginTop: '20px',
      maxWidth: '180px',
    }
    const titleStyle = {
      textAlign: 'center'
    }

    return (
      <div style={layoutStyle}>
        <Paper style={paperStyle}>
          <div>
            <img style={imageStyle} src={pomelo_logo} />
            <h1 style={titleStyle}>Login</h1>
          </div>
          <form onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <TextField
                id="email-input"
                label="Email"
                type="email"
                autoComplete="your email"
                margin="normal"
                value={this.state.email}
                onChange={this.handleChange('username')}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                id="password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                margin="normal"
                value={this.state.password}
                onChange={this.handleChange('password')}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
            <FormControlLabel
              control={<Checkbox value="remember" onChange={this.handleCheck('rememberMe')} checked={this.state.rememberMe} color="primary" />}
              label="Remember me"
            />
            <Button variant="contained" type='submit' onClick={this.handleSubmit}>
              Login
            </Button>
            </FormControl>
          </form>
          <p>Not registered? <Button onClick={this.goToRegister}>register</Button></p>
        </Paper>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={this.state.snackbarOpen}
          onClose={this.handleSnackbarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Error on login</span>}
        />

      </div>
    )
  }
}

export default withRouter(Login)
