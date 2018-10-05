import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css'
import UnauthenticatedRoute from './components/UnauthenticatedRoute'
import PrivateRoute from './components/PrivateRoute'
import Register from './components/Register'
import Login from './components/Login'
import DashboardLayout from './components/DashboardLayout'
import {authenticated} from './constants'

class App extends Component {
  isLoggedIn () {return authenticated}

  renderDefaultPage () { return () => {
    if (this.isLoggedIn()) return <Redirect to="/dashboard"/>
    return <Redirect to="/login"/>
  }}

  render() {
    return (
      <Switch>
        <Route exact path="/" render={this.renderDefaultPage()} />
        <UnauthenticatedRoute path='/register' component={Register} />
        <UnauthenticatedRoute path='/login' component={Login} />
        <PrivateRoute path='/dashboard' component={DashboardLayout} />
      </Switch>
    )
  }
}

export default App;
