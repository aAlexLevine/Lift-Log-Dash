import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CreateNewWorkout from './CreateNewWorkout.jsx';
import LastWeeksBarChart from './LastWeeksBarChart.jsx'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';


const styles = theme => ({
  root: {
    flexGrow: 1,
    // overflow:'hidden'
    // marginTop: theme.spacing.unit * 3,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    // wordWrap: 'break-word'
  },
});

function HomeDash(props) {
  const { classes, userID } = props;
  const date = new Date()
  const dateStr = date.toDateString()
  console.log('HomE DaSh props', props.userID)
  
  // TODO: Convert paper to cards
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      
      {/* chart */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <Typography variant="subtitle1" gutterBottom>
                Last week's progress
              </Typography>
              <LastWeeksBarChart/>
          </Paper>
        </Grid>

         {/* Newworkout */}
          <Grid item xs={6} zeroMinWidth>
          <Card>
            <CardHeader disableTypography
                title={<Typography variant="subtitle1">Today is: </Typography>}
                subheader={<Typography variant="h4">{dateStr}</Typography>}
            />
            <CardContent>
            <Typography variant="subtitle1">Launch new workout log </Typography>
              
              <CreateNewWorkout 
                  userID={userID}
                  liftStateUpFromCreateNewWorkout={props.liftStateUpFromCreateNewWorkout}
              />
            </CardContent>
          </Card>        
        </Grid>

      {/* Last workout */}
      <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="subtitle1">
              Last recorded workout:
            </Typography>
            <Typography variant="h4">
              {dateStr}
            </Typography>
            <Typography variant="h6">
              Plan: 5 x 5,  Group: B
            </Typography>
          </Paper>
        </Grid>
      
      </Grid>

    </div>
  );
}

export default withStyles(styles)(HomeDash);