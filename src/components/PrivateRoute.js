import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {authenticated} from './../constants'

export default ({component: Component, ...params}) => (
  <Route
    {...params}
    render = {
      props => (
        authenticated ? (<Component {...props} />) : ( <Redirect to="/login"/> )
      )
    }
  />
)
