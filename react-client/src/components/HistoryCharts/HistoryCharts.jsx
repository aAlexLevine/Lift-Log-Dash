import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import GroupDataChart from './GroupDataChart.jsx';
import ChartControls from './ChartControls.jsx';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: 'relative'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    position: 'static'
  },
  topPaper: {
    bottom: '100px',
    width: '50%'
  },
  headers: {
    color: 'white'
  },
  chartCardHeader: {
    backgroundColor: '#4a4949',
    marginBottom: '15px'
  }
});

class HistoryCharts extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        selectedPlan: {},
        plansData: [],
        groups: [],
        groupedLogs: [],
        toggleControls: false,
        dataTypeSelected: 'maxLiftsData'

      }
  }

  componentDidMount() {
    axios.get('/api/dash/getPlans', {
      params: {
        // user: this.props.userID
      }
    })
      .then(plans => {this.setState({plansData: plans.data})})
      .catch(err => console.log(err))
  }

  handleSelectPlan = (e) => {
    console.log('event.target--', e.target, e)
    this.setState({
      selectedPlan: e.target.value,
      }, () => this.getGroups(this.state.selectedPlan.id)
    )
  }

  getGroups = (planID) => {
    this.setState({toggleControls: true})
    this.state.selectedPlan && 
      axios.get('/api/dash/getGroups', {
        params: {
          id: planID
        }
      })
      .then(results => this.setState({groups: results.data}, this.getAllWorkoutLogsByGroup))
      .catch(err => console.log(err))
  }

  getAllWorkoutLogsByGroup = () => {
    const fetchLogs = (plan, group) => {
      return axios.get('/api/dash/getAllWorkoutLogsByGroup', {
        params: {
          // userID: user,
          planID: plan,
          group: group
        }
      })
      .then(logs => logs.data)
    }
    const logRequests = this.state.groups.map(group => (
      fetchLogs(this.state.selectedPlan.id, group.title)
      )
    )
    
    Promise.all(logRequests)
      .then(groupedLogsArr => this.setState({groupedLogs: groupedLogsArr}))
      .catch(err => console.log(err))
  }

  setDataType = (type) => {
    this.setState({dataTypeSelected: type})
  }

  render() {
    const { classes } = this.props;
    const showControls = !!(this.state.selectedPlan && this.state.selectedPlan.id)

    console.log(!!(this.state.selectedPlan && this.state.selectedPlan.id))
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item sm={4} xs={12}>


          <Card>
            <CardHeader disableTypography
                className={classes.chartCardHeader}
                title={
                  <Typography 
                    className={classes.headers} 
                    variant="subtitle1">
                     Progress Charts
                  </Typography>
                }
              />
            <CardContent>
            <Typography variant="body1" style={{marginBottom: '30px'}}>
                Display entire workout history by chosen plan. Charts are ordered by their sub-groups.
              </Typography>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="selectPlan">Plan</InputLabel>
                <Select //displayEmpty
                  value={this.state.selectedPlan}
                  onChange={this.handleSelectPlan}
                  input={<Input name="selectedPlan" id="selectPlan" />}
                >
                  <MenuItem value=""> 
                    <em>None</em>
                  </MenuItem>
                  {this.state.plansData.map((plan, i) => (
                    <MenuItem value={plan} key={plan.id}> {plan.planName} </MenuItem>  
                  ))}
                </Select>
                <FormHelperText>Select from all your workout plans.</FormHelperText>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {showControls 
          ? <Grid item sm={4} xs={12}>
              <Slide direction="left" in={showControls}  >
                
                  <ChartControls select
                    setDataType={this.setDataType}
                  />
                
              </Slide>
            </Grid>
          : null}

        
        {showControls && this.state.groupedLogs.map((logs, i) => (
          <Grid item xs={12} key={i}>
            <Slide direction="up" in={showControls}>
            {/* <Paper className={classes.paper}> */}
            <Card>
            <CardHeader disableTypography
                className={classes.chartCardHeader}
                title={
                  <Typography 
                    className={classes.headers} 
                    variant="subtitle1">
                    Group {this.state.groups[i] && this.state.groups[i].title}
                  </Typography>
                }
              />
            <CardContent>
            <GroupDataChart 
                    logs={logs} 
                    key= {i} 
                    // groupTitle={this.state.groups[i] && this.state.groups[i].title}
                    dataTypeSelected={this.state.dataTypeSelected}
                    />
            </CardContent>
          </Card>
                
                
                {/* <GroupDataChart 
                    logs={logs} 
                    key= {i} 
                    groupTitle={this.state.groups[i] && this.state.groups[i].title}
                    dataTypeSelected={this.state.dataTypeSelected}
                    /> */}
            {/* </Paper>   */}
            </Slide>
          </Grid>
        ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(HistoryCharts);