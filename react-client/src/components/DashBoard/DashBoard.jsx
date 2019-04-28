import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DashRouter from './DashRouter.jsx';
import NavBar from '../NavBar/NavBar.jsx';
import SideMenu from './SideMenu.jsx';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    // backgroundColor:'#b8ddef17'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      drawerWidth: 240,
      userID: 1
  }
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar 
          handleDrawerOpen={this.handleDrawerOpen} 
          open={this.state.open}
          />

        <SideMenu
          handleDrawerClose={this.handleDrawerClose}
          open={this.state.open}
        />
         
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
            <DashRouter userID={this.state.userID}/>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
