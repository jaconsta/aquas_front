import React from 'react'
import { withRouter } from "react-router-dom"

 class Login extends React.Component {
  goToRegister = () => {
    const { history } = this.props
    history.push("register")
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label> 
            Email
            <input type="email"/>
          </label>
          <label>
            password
            <input type="password"/>
          </label>
        </form>
        <p>Not registered? <button onClick={this.goToRegister}>register</button></p>
      </div>
    )
  }
}

export default withRouter(Login)