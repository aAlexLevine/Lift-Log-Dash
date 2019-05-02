import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import GetStarted from './GetStarted.jsx'
import SignIn from './SignIn.jsx'
import RegisterUser from './RegisterUser.jsx';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: '#eef4f75c'//theme.palette.common.white,
    },
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  getStartedContainer:{
    maxWidth: 400,
    margin: '0 auto'
  
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  }
});

function LandingPage(props) {
  const { classes, setAuthFromLogIn, isAuth } = props;
  return (
    <React.Fragment>
      <div className={classes.layout}>
      
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Welcome
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" component="p">
            Build and customize your own personal workout plans. Use your plan to organize and complete 
            your goals. Monitor your all your progress and success. Get Started Below.
          </Typography>
        </div>
        {/* End hero unit */}
      
      {isAuth 
        ? null
        : <div className={classes.getStartedContainer}>
          <div>
            <Route exact path="/landingPage/" component={GetStarted} />
            <Route path="/landingPage/signIn" render={(props)=> (
              <SignIn setAuthFromLogIn={setAuthFromLogIn} {...props}/>)}/>
              <Route path="/landingPage/register" component={RegisterUser} />
          </div>
        </div>
      }  

      </div>
      {/* Footer */}
      <footer className={classNames(classes.footer, classes.layout)}>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}


export default withStyles(styles)(LandingPage);