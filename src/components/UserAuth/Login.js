import React from 'react'
import { withRouter } from "react-router-dom"

import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'

import GeneralLayout from './GeneralLayout'
import {
  AuthInput,
  RegisterText,
  RememberLabel
} from './styled'
import { userLogin } from '../../services/users'

class Login extends React.Component {
   constructor (props) {
     super(props)
     this.state = {
       email: '',
       password: '',
       rememberMe: false,
       snackbarOpen: false
     }
   }

   requestLogin = async () => {
     const { email, password } = this.state
     try {
       await userLogin({ email, password })
       this.goToDashboard()
     } catch (err) {
       this.setState({snackbarOpen: true})
     }
   }

   handleSubmit = (event) => {
     event.preventDefault()
     this.requestLogin()
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

   closeError = () => {
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

   getErrorProps = () => ({
     open: this.state.snackbarOpen,
     onClose: this.closeError,
     message: 'Error on login',
   })

  render () {
    return (
      <GeneralLayout title={'Login'} error={this.getErrorProps()}>
          <form onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <AuthInput
                id="email-input"
                label="Email"
                type="email"
                autoComplete="your email"
                margin="normal"
                value={this.state.email}
                onChange={this.handleChange('email')}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <AuthInput
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
              <RememberLabel
                control={<Checkbox value="remember" onChange={this.handleCheck('rememberMe')} checked={this.state.rememberMe} color="primary" />}
                label="Remember me"
              />
              <Button variant="contained" type='submit' onClick={this.handleSubmit}>
                Login
              </Button>
            </FormControl>
          </form>
          <p><RegisterText>Not registered?</RegisterText> <Button onClick={this.goToRegister}>register</Button></p>
      </GeneralLayout>
    )
  }
}

export default withRouter(Login)
