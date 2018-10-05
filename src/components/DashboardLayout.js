import React from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'

import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider'

import Dashboard from '@material-ui/icons/Dashboard';
import Memory from '@material-ui/icons/Memory';

import pomelo_logo from '../static/images/pomelo_logo.png';
import DashboardContent from './DashboardContent'
import Devices from './Devices'

export default class DashboardLayout extends React.Component {
  renderTopToolbar () {
    const appBarStyle = {
      display: 'flex',
      zIndex: 5000,
      backgroundColor: '#6a944f',
      top: 0,
      left: 'auto'
    }

    const imageStyle = {
     maxWidth: '180px',
    }

    return (
      <AppBar position="absolute" style={appBarStyle}>
        <Toolbar>
          <img alt={"Pomelo logo"} style={imageStyle} src={pomelo_logo} />
        </Toolbar>
      </AppBar>

    )
  }

  renderToolbarSeparator () {
    const toolbarSeparatorStyle = {minHeight: '64px'}
    return (
      <div style={toolbarSeparatorStyle} />
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
      <Drawer variant="permanent" style={drawerStyle}>
        {this.renderToolbarSeparator()}
        <List>
          <ListItem component={Link} to="/dashboard" button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
        <Divider />
        <List subheader={<ListSubheader component='div'>General</ListSubheader>}>
          <ListItem  component={props =>  <Link to='/dashboard/devices' {...props}/>} button>
            <ListItemIcon>
              <Memory />
            </ListItemIcon>
            <ListItemText primary="My devices" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
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