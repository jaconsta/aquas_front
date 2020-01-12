import styled from 'styled-components'

import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'

import { colors } from '../CommonStyled/config'

export const StyledAppBar = styled(AppBar)`
  display: flex;
  flex-grow: 1;
  z-index: 5000;
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
