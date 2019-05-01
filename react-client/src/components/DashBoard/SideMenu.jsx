import React from 'react';
import { withStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import classNames from 'classnames';
import { mainListItems, SecondaryListItems } from './ListItems.jsx';
import { notAuthItems } from './NotAuthItems.jsx';

const drawerWidth = 240;

const styles = (theme)=> ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 0,
  },
})

const SideMenu = (props) => {
  const { classes } = props 
  return (
        <Drawer
            variant="permanent"
            open={props.open}
            classes={{
              paper: classNames(classes.drawerPaper, !props.open && classes.drawerPaperClose)
            }}
        >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={props.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
          
            <Divider />

            {props.isAuth
              ? <div>
                  <List>{mainListItems}</List>
                  <Divider />
                  <SecondaryListItems setAuthFromLogOut={props.setAuthFromLogOut}/>
                </div>
              : <List>{notAuthItems}</List>
            }
        </Drawer>
  )
}

export default withStyles(styles)(SideMenu);