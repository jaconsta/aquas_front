import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {isLoggedIn} from './../utils/auth'

export default ({component: Component, ...params}) => (
  <Route
    {...params}
    render = {
      props => (
        isLoggedIn() ? (<Component {...props} />) : ( <Redirect to="/login"/> )
      )
    }
  />
)
