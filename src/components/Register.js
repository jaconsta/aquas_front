import React from 'react'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import CenteredForm from './CenteredForm'
import { userRegister } from '../services/users'

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  componentDidMount () {
    this.props.setTitle('Register')
  }

  registerUser = async () => {
    try {
      await userRegister(this.state)
      this.goToLogin()
    } catch (err) {
      this.props.showErrorSnackbar(err.message)
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

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={24}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Your name"
              fullWidth
              value={this.state.firstName}
              onChange={this.setValue('firstName')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Last name"
              fullWidth
              value={this.state.lastName}
              onChange={this.setValue('lastName')}
            />
          </Grid>
        </Grid>
        <TextField
          label="Email"
          type="email"
          margin="normal"
          fullWidth
          value={this.state.email}
          onChange={this.setValue('email')}
        />
        <TextField
          label="Password"
          type="password"
          margin="normal"
          fullWidth
          value={this.state.password}
          onChange={this.setValue('password')}
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          fullWidth
          style={{margin: "10px 0px"}}
        >Register</Button>
      </form>
    )
  }
}

const RegisterForm = props => (
  <CenteredForm Children={Register} {...props}/>
)

export default RegisterForm
