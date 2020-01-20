import React from 'react'

import CardContent from '@material-ui/core/CardContent'
import Memory from '@material-ui/icons/Memory'

import  DailySprinklesCard from './Cards/DailySprinklesCard'
import {
  ActiveDevicesCard,
  ActivesDevicesIconContainer,
  ActiveDevicesName,
  ActiveDevicesTotalHighlight,
} from './styled'
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
    this.setState({ activeDevices })
  }

  renderActiveDevices () {
    return (
      <ActiveDevicesCard>
        <CardContent>
          <div>
            <ActivesDevicesIconContainer>
              <Memory />
            </ActivesDevicesIconContainer>
            <div>
              <ActiveDevicesName>Mis dispositivos activos</ActiveDevicesName>
              <ActiveDevicesTotalHighlight>{this.state.activeDevices} / {this.state.totalDevices}</ActiveDevicesTotalHighlight>
            </div>
          </div>
        </CardContent>
      </ActiveDevicesCard>
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
