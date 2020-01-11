import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'

import GeneralLayout from './GeneralLayout'
import {
  AuthInput,
} from './styled'
import { userRegister } from '../../services/users'

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: {
        open: false,
        message: ''
      }
    }
  }

  registerUser = async () => {
    try {
      await userRegister(this.state)
      this.goToLogin()
    } catch (err) {
      console.error(err)
      const message = err.message || 'Error on register';
      this.setState({ error: { message, open: true } })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.registerUser()
  }

  setValue = field => e => {
    this.setState({[field]: e.target.value})
  }

  goToLogin = () => {
    const { history } = this.props
    history.push("login")
  }

  closeError = () => { this.setState({ error: { open: false, message: '' } }) }

  getErrorProps = () => ({
    ...this.state.error,
    onClose: this.closeError,
  })

  render () {

    return (
      <GeneralLayout title={'Register'} error={this.getErrorProps()}>

        <form onSubmit={this.handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <AuthInput
              label="Your name"
              value={this.state.firstName}
              onChange={this.setValue('firstName')}
              margin="normal"
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <AuthInput
              label="Last name"
              value={this.state.lastName}
              onChange={this.setValue('lastName')}
              margin="normal"
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <AuthInput
              label="Email"
              type="email"
              margin="normal"
              value={this.state.email}
              onChange={this.setValue('email')}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <AuthInput
              label="Password"
              type="password"
              margin="normal"
              value={this.state.password}
              onChange={this.setValue('password')}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <Button
              variant="contained"
              type="submit"
              >Register</Button>
            </FormControl>
        </form>
      </GeneralLayout>
    )
  }
}


export default Register
