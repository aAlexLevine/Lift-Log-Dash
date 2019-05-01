import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

export const mainListItems = (
  <div>
   <Link to="/">
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Landing Page" />
    </ListItem>
  </Link> 
    
    <Link to="/home">
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    </Link>

  <Link to="/historyCharts">
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="History Charts" />
    </ListItem>
  </Link>
  
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>

  <Link to="/testColors">
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Test Colors" />
    </ListItem>
  </Link>
  </div>
);

export class SecondaryListItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }

  logout = () => {
    this.props.setAuthFromLogOut() 
    this.setState({redirect: true})
    axios.post('/api/auth/logout')
      .then(res => console.log('logout client', res))
      .catch(err => console.log(err))
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to ="/landingPage"/>
    } 
    return (
        <div>
          <ListItem button onClick={this.logout}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </div>
      )
    }
  }