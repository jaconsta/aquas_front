import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import Memory from '@material-ui/icons/Memory';

export default class DashboardContent extends React.Component {
  renderActiveDevices () {
    const cardStyle = {
      width: '300px'
    }

    const iconStyle = {
      float: 'left', 
      color: 'green',
      textAlign: 'center',
      height: '1.5em',
      marginRight: '15px',
      border: '2px solid green',
      borderRadius: '25px',
      marginTop: '10px'
    }

    const nameStyle = {
      color: 'grey'
    }

    const totalHightlight = {
      fontSize: '1.4em',
      fontWeight: 'bold'
    }

    return (
      <Card style={cardStyle}>
        <CardContent>
          <div>
            <div style={iconStyle}>
              <Memory />
            </div>
            <div>
              <div style={nameStyle}>Mis dispositivos activos</div>
              <div style={totalHightlight}>0</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  render () {
    return (
      <div>
        <h1>Welcome</h1>
        {this.renderActiveDevices()}
      </div>
    )
  }
}