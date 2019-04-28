
import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';

const drawerWidth = 240;

const styles = theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  // toolbarIcon: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  //   padding: '0 8px',
  //   ...theme.mixins.toolbar,
  // },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    colorDefault: 'white'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
})

const NavBar = (props) => {
  const { classes } = props
  return (
    <AppBar 
      color="default" 
      position="absolute" 
      className={classNames(classes.appBar, props.open && classes.appBarShift)}>
      <Toolbar disableGutters={!props.open} className={classes.toolbar}>
        <IconButton 
          color="inherit" 
          aria-label="Open drawer" 
          onClick={props.handleDrawerOpen} 
          className={classNames(classes.menuButton, props.open && classes.menuButtonHidden)}
          >
          <MenuIcon />
        </IconButton>
        <Typography 
          component="h1" 
          variant="h6" 
          color="inherit" 
          noWrap 
          className={classes.title}
          >
          Lift Log
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(NavBar);