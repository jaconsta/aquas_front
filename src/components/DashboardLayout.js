import React, { Fragment } from 'react'
import { Link, Switch, Route, withRouter } from 'react-router-dom'

import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
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

import pomelo_logo from '../static/images/pomelo_logo.png';
import DashboardContent from './DashboardContent'
import Devices from './Devices'
import { logoutUser } from './../utils/auth'


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
    const appBarStyle = {
      display: 'flex',
      zIndex: 5000,
      backgroundColor: '#6a944f',
      top: 0,
      left: 'auto',
      flexGrow: 1,
    }

    const imageStyle = {
     maxWidth: '180px',
    }

    return (
      <AppBar position="absolute" style={appBarStyle}>
        <Toolbar>
          <Hidden smUp implementation="css">
            <IconButton
            color={'inherit'}
              onClick={this.toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <img alt={"Pomelo logo"} style={imageStyle} src={pomelo_logo} />
          <Button color="inherit" onClick={this.logout}>Logout</Button>
        </Toolbar>
      </AppBar>

    )
  }

  toggleSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
  }

  renderToolbarSeparator () {
    const toolbarSeparatorStyle = {minHeight: '64px'}
    return (
      <div style={toolbarSeparatorStyle} />
    )
  }

  renderSidebarContent() {
    return (
      <Fragment>
        {this.renderToolbarSeparator()}
        <List>
          <ListItem onClick={this.toggleSidebar} component={Link} to="/dashboard" button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
        <Divider />
        <List subheader={<ListSubheader component='div'>General</ListSubheader>}>
          <ListItem onClick={this.toggleSidebar}  component={props =>  <Link to='/dashboard/devices' {...props}/>} button>
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
    const drawerStyle = {
      display: 'flex',
      position: 'relative',
      width: '260px',
      flexDirection: 'column'
    }

    return (
      <Fragment>
        <Hidden xsDown implementation="css">
          <Drawer variant="permanent" style={drawerStyle}>
            {this.renderSidebarContent()}
          </Drawer>
        </Hidden>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            style={drawerStyle}
            open={this.state.sidebarOpen}
            onClose={this.toggleSidebar}
          >
            {this.renderSidebarContent()}
          </Drawer>
        </Hidden>

      </Fragment>
    )
  }

  renderContent () {
    const style = {
      flexGrow: 1,
      padding: '20px 0px'
    }

    return (
      <div style={style}>
        {this.renderToolbarSeparator()}
        <Switch>
          <Route exact path='/dashboard' component={DashboardContent}/>
          <Route path='/dashboard/devices' component={Devices}/>
        </Switch>
      </div>
    )
  }

  render () {
    const style = {
      flexGrow: 1,
      position: 'relative',
      display: 'flex'
    }
    return (
      <div style={style}>
        {this.renderTopToolbar()}
        {this.renderSidebar()}
        {this.renderContent()}
      </div>
    )
  }
}

export default withRouter(DashboardLayout)
