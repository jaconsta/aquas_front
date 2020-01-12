import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Memory from '@material-ui/icons/Memory'

import  DailySprinklesCard from './Cards/DailySprinklesCard'
import { fetchDeviceCount, fetchDeviceDailySprinkles, fetchDeviceActives } from '../../services/devices'

export default class DashboardContent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      totalDevices: 0,
      dailySprinkles: [],
      activeDevices: 0,
    }
  }

  componentDidMount () {
    this.getDevices()
    this.getDeviceDailySprinkles()
    this.getDevicesActiveCount()
  }

  getDevices = async () => {
    const {total_devices: totalDevices} = await fetchDeviceCount()
    this.setState({totalDevices})
  }

  getDeviceDailySprinkles = async () => {
    const { devices_count: dailySprinkles } = await fetchDeviceDailySprinkles()
    this.setState({ dailySprinkles })
  }

  getDevicesActiveCount = async () => {
    const { active_devices: activeDevices } = await fetchDeviceActives()
    console.log('activeDevices', activeDevices)
    this.setState({ activeDevices })
  }

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
              <div style={totalHightlight}>{this.state.activeDevices} / {this.state.totalDevices}</div>
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
        <DailySprinklesCard title="Daily sprinkles" data={this.state.dailySprinkles} />
      </div>
    )
  }
}
