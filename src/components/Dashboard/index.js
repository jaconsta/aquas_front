import React, { Fragment } from 'react'
import { Link, Switch, Route, withRouter } from 'react-router-dom'

import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import Dashboard from '@material-ui/icons/Dashboard';
import Memory from '@material-ui/icons/Memory';

import pomelo_logo from '../../static/images/pomelo_logo.png';
import DashboardContent from './DashboardContent'
import Devices from '../Devices'
import {
  DashboardContainer,
  StyledAppBar,
  TopLogo,
  ToolbarSeparator,
  StyledDrawer,
  ContentContainer,
} from './styled'
import { logoutUser } from './../../utils/auth'


class DashboardLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarOpen: false,
    }
  }

  goToLogin = () => {
    const { history } = this.props
    history.push("login")
  }

  logout = () => {
    logoutUser()
    this.goToLogin()
  }

  renderTopToolbar () {
    return (
      <StyledAppBar position="absolute">
        <Toolbar>
          <Hidden mdUp implementation="css">
            <IconButton
            color={'inherit'}
              onClick={this.toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <TopLogo alt={"Pomelo logo"} src={pomelo_logo} />
          <Button color="inherit" onClick={this.logout}>Logout</Button>
        </Toolbar>
      </StyledAppBar>

    )
  }

  toggleSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
  }

  closeSidebar = () => {
    this.setState({ sidebarOpen:false })
  }

  renderSidebarContent() {
    return (
      <Fragment>
        <ToolbarSeparator />
        <List>
          <ListItem onClick={this.closeSidebar} component={Link} to="/dashboard" button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
        <Divider />
        <List subheader={<ListSubheader component='div'>General</ListSubheader>}>
          <ListItem onClick={this.closeSidebar} component={Link} to='/dashboard/devices' button>
            <ListItemIcon>
              <Memory />
            </ListItemIcon>
            <ListItemText primary="My devices" />
          </ListItem>
        </List>
        <Divider />
      </Fragment>
    )
  }

  renderSidebar () {
    return (
      <Fragment>
        <Hidden smDown implementation="css">
          <StyledDrawer variant="permanent">
            {this.renderSidebarContent()}
          </StyledDrawer>
        </Hidden>
        <Hidden mdUp implementation="css">
          <StyledDrawer
            variant="temporary"
            open={this.state.sidebarOpen}
            onClose={this.toggleSidebar}
          >
            {this.renderSidebarContent()}
          </StyledDrawer>
        </Hidden>
      </Fragment>
    )
  }

  renderContent () {
    return (
      <ContentContainer>
        <ToolbarSeparator />
        <Switch>
          <Route exact path='/dashboard' component={DashboardContent}/>
          <Route path='/dashboard/devices' component={Devices}/>
        </Switch>
      </ContentContainer>
    )
  }

  render () {
    return (
      <DashboardContainer>
        {this.renderTopToolbar()}
        {this.renderSidebar()}
        {this.renderContent()}
      </DashboardContainer>
    )
  }
}

export default withRouter(DashboardLayout)
