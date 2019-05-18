import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import './animate.css'
import { YYYYMMDDformat } from '../../utils/helpers.js'

const styles = (theme) => ({
  select: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  headers: {
    color: 'white'
  },
  arrowButton: {
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    left: '13px',
  },
  arrow: {
    fontSize: '80px',
    color: 'black',
    animation: 'bounce 1s infinite linear',
    position: 'relative',

  },
  arrowStatic: {
    fontSize: '80px',
    color: 'black',
    position: 'relative',
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    left: '13px'
  },
  startPaper: {
    marginLeft: '24px',
    rounded: '10px'

  },
  startCardHeader: {
    backgroundColor: '#4a4949'
  },
  chartCardHeader: {
    backgroundColor: '#4a4949',
    marginBottom: '15px'
  }
})

class CreateNewWorkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      plansData: [],
      groupsData: [],
      selectedPlan: {},
      selectedGroup: {},
      redirect: false
    }
  }

  componentDidMount() {
    axios.get('/api/dash/getPlans')
      .then(plans => {this.setState({plansData: plans.data})})
      .catch(err => console.log(err))
  }

  handleSelectPlan = (e) => {
    this.setState({selectedPlan: e.target.value}) 
    if (e.target.value) {this.getGroupsFromSelectedPlan(e.target.value.id)}
  }

  getGroupsFromSelectedPlan = (planID) => {
    axios.get('/api/dash/getGroups', {
      params: {
        id: planID
      }
    })
      .then(groups => {this.setState({groupsData: groups.data})}) 
      .catch( err => console.log(err))
  }

  handleSelectGroup = (e) => {
    this.setState({selectedGroup: e.target.value})
  }

  createNewWorkOut = () => {
    const { selectedPlan, selectedGroup } = this.state
    const logData = {
      plan: selectedPlan.id,
      planGroup: selectedGroup.title,
      date: YYYYMMDDformat(this.props.date)
    }
    if (selectedPlan && selectedGroup) {
      axios.post('/api/dash/createNewWorkOut', logData)
        .then(results => {
          const selected = {
            plan: selectedPlan,
            group: selectedGroup,
            logID: results.data.insertId,
            date: this.props.date 
            // results.data.date.slice(0, 10)
          }
          console.log('Created new workout log.', selected)
          this.props.liftStateUpFromCreateNewWorkout(selected)
          this.setState({redirect: true})
        })
        .catch(err => console.log(err))
    }
  }

  
  render() {
    const { classes } = this.props;
    const { selectedPlan, selectedGroup, redirect } = this.state
    if (redirect) {
      return <Redirect to="/new"/>
    }
    
    return (
      <div className={classes.select}>
      <Card>
        <CardHeader disableTypography
          className={classes.startCardHeader}
          title={
            <Typography 
              className={classes.headers} 
              variant="subtitle1">
              Start new workout 
              </Typography>
          }
        />
        <CardContent>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="plan-helper">Plan</InputLabel>
            <Select
              value={this.state.selectedPlan}
              onChange={this.handleSelectPlan}
              input={<Input name="plan" id="plan-helper" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.state.plansData.map((plan) => (
                <MenuItem value={plan} key={plan.id}>{plan.planName}</MenuItem>  
              ))}
            </Select>
            <FormHelperText>Select plan.</FormHelperText>
          </FormControl>
        
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="group-helper">Group</InputLabel>
            <Select
              value={this.state.selectedGroup}
              onChange={this.handleSelectGroup}
              input={<Input name="group" id="group-helper" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.state.groupsData.map((group) => (
                <MenuItem value={group} key={group.id}>{group.title}</MenuItem>  
              ))}
            </Select>
            <FormHelperText>Select sub-groups.</FormHelperText>
          </FormControl>
        </CardContent>  
        </Card>

        {/* <Slide direction="left" in={!!(selectedPlan.id && selectedGroup.id)} mountOnEnter unmountOnExit> */}
          {/* <Paper className={classes.startPaper} square={false} rounded> */}
          <div>
            {(!!(selectedPlan.id && selectedGroup.id))
              ? <IconButton 
                  className={classes.arrowButton} 
                  onClick={this.createNewWorkOut}
                  >
                  <ArrowForwardIosIcon className={classes.arrow}/>
                </IconButton>
              : <ArrowForwardIosIcon className={classes.arrowStatic}/>
            }
          </div>
              {/* </Paper> */}
            {/* </Slide> */}

      </div>  
    )
  }
}

export default withStyles(styles)(CreateNewWorkout);