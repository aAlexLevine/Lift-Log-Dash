import React from 'react';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  cardHeader: {
    backgroundColor: '#4a4949',
    color: 'white',
  },
  options: {
    marginTop: '25px',
    // width: '100%'
  },
  demoDivider: {
    borderTop: `1px solid ${theme.palette.divider}`
  },
  demo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 180,
    marginBottom:'15px'
  },
  cardContent: {
    padding: '16px 16px 0px 16px'
  },
  link: {
    textDecoration: 'none'
  }
})

const GetStarted = (props) => {
  const { classes } = props;
  return (
          <Card>
            <CardHeader
              title={
                <Typography 
                  className={classes.cardHeader} 
                  variant="h5">
                    Get Started
                </Typography>}
              titleTypographyProps={{ align: 'center'}}
              className={classes.cardHeader}
              
            />
            <CardContent className={classes.cardContent}>
                <div className={classes.options}>
                <Typography variant="subtitle1" align="center">
                  Need an account? Sign up here!
                </Typography>
                  <Link to="/landingPage/register" className={classes.link}>
                    <Button fullWidth variant='outlined' color="primary">
                      Sign up for free
                    </Button>
              </Link>
              </div>
              <div className={classes.options}>
              <Typography variant="subtitle1" align="center">
                  Already a member? Log in here!
                </Typography>
                <Link to="/landingPage/signIn" className={classes.link}>
                  <Button fullWidth variant='outlined' color="primary">
                      Log In
                  </Button>
                </Link>
              </div>

              {/* <div className={classNames(classes.options, classes.demoDivider)}>
              <Typography className={classes.options} variant="subtitle1" align="center">
                  Just Looking? Try the demo!
                </Typography>
              </div> */}
            
            </CardContent>
            {/* <div className={ classes.demo}>
                <Button className={classes.demo}variant='outlined' color="primary">
                Run demo data
              </Button>
              </div> */}
          </Card>
  )
}

export default withStyles(styles)(GetStarted);