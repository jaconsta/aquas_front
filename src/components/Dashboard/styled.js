import styled from 'styled-components'

import AppBar from '@material-ui/core/AppBar'
import Card from '@material-ui/core/Card'
import Drawer from '@material-ui/core/Drawer'

import { colors } from '../CommonStyled/config'

export const StyledAppBar = styled(AppBar)`
  display: flex;
  flex-grow: 1;
  z-index: 5000 !important;
  background-color: ${colors.primaryGreen } !important;
  top: 0;
  left: auto;
`

export const TopLogo = styled.img`
  max-width: 180px;
`

export const ToolbarSeparator = styled.div`
  min-height: 64px;
`

export const StyledDrawer = styled(Drawer)`
  display: flex;
  position: relative;
  width: 260px;
  flex-direction: column;
`

export const DashboardContainer = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
`

export const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 20px 0px;
`

export const ActiveDevicesCard = styled(Card)`
  width: 300px;
`

export const ActivesDevicesIconContainer = styled.div`
  float: left;
  color: green;
  text-align: center;
  height: 1.5em;
  margin-right: 15px;
  border: 2px solid green;
  border-radius: 25px;
  margin-top: 10px;
`

export const ActiveDevicesName = styled.div`
  color: grey;
`

export const ActiveDevicesTotalHighlight = styled.div`
  font-size: 1.4em;
  font-weight: bold;
`
