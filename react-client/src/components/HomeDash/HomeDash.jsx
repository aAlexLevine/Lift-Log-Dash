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
import { MDformat } from '../../utils/helpers.js';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
  },
  headers: {
      color: 'white'
  },
  arrowButton: {
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    left: '13px'
    
  },
  arrow :{
    fontSize: '80px',
    color: 'black',
    animation: 'bounce 1s infinite linear',
    position: 'relative'
  },
  startPaper: {
    marginLeft: '24px'
  },
  startCardHeader : {
    backgroundColor: '#4a4949'
  },
  chartCardHeader: {
    backgroundColor: '#4a4949',
    marginBottom: '15px'
  }
  
});

class HomeDash extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      date: {},
      dateFormatted: ''
    }
  }

  componentDidMount() {
    this.setDate()
  }

  setDate = () => {
    console.log('setdate func')
    const dayNames = {
      0: "Sun",
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat"
    }
    const date = new Date()
    const day = date.getDate()
    const dayName = date.getDay()
    const month = date.getMonth()
    let year = date.getFullYear().toString()
    year = year.slice(year.length  - 2)
    const dateFormat = `${dayNames[dayName]} ${day}.${month + 1}.${year}` 
    
    this.setState({date: date, dateFormatted: MDformat(date)})
    
  }

  render() {
    const { classes, liftStateUpFromCreateNewWorkout } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>

        <Grid item sm={3} xs={12}>
            <Paper 
              style={{backgroundColor: 'orange'}} 
              className={classes.paper}
            >
              <Typography className={classes.headers} variant="h4">
                  {this.state.dateFormatted}
              </Typography>
              <Typography className={classes.headers} variant="subheading">
                  Today
              </Typography>
            </Paper>
          </Grid>

          <Grid item sm={3} xs={12}>
            <Paper 
              style={{backgroundColor: '#d232d2'}} 
              className={classes.paper}
            >
              <Typography className={classes.headers} variant="h4">
                  5 x 5 | B
              </Typography>
              <Typography className={classes.headers} variant="subheading">
                  Last workout
              </Typography>
            </Paper>
            
          </Grid>

          <Grid item sm={3} xs={12}>
            <Paper 
              style={{backgroundColor: 'blue'}} 
              className={classes.paper}
            >
              <Typography className={classes.headers} variant="h4">
                  34
              </Typography>
              <Typography  className={classes.headers} variant="subheading">
                  Workouts logged
              </Typography>
            </Paper>
          </Grid>

          <Grid item sm={3} xs={12}>
            <Paper 
              style={{backgroundColor: '#36c336'}} 
              className={classes.paper}
              >
              <Typography className={classes.headers} variant="h4">
                  15630
              </Typography>
              <Typography className={classes.headers} variant="subheading">
                  Total weight lifted
              </Typography>
              </Paper>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader disableTypography
                  className={classes.chartCardHeader}
                  title={
                    <Typography 
                      className={classes.headers} 
                      variant="subtitle1">
                      Recent Activity
                    </Typography>
                  }
                />
              <CardContent>
                <LastWeeksBarChart/>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xl={6} xs={12} zeroMinWidth style={{display: 'flex'}}>
            <CreateNewWorkout 
                date={this.state.date}
                // userID={userID}
                liftStateUpFromCreateNewWorkout={liftStateUpFromCreateNewWorkout}
            />
          </Grid>
        
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(HomeDash);