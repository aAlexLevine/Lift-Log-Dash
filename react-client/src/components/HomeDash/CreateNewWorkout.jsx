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
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';


const styles = (theme) => ({
  select: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
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
    axios.get('/api/dash/getPlans', {
      params: {
        user: this.props.userID
      }
    })
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
      userID: this.props.userID,
      plan: selectedPlan.id,
      planGroup: selectedGroup.title
    }
    console.log('log data obj',logData)
    if (selectedPlan && selectedGroup) {
      axios.post('/api/dash/createNewWorkOut', logData)
        .then(results => {
          // console.log('Created new workout log.', results.data)
          const selected = {
              userID: this.props.userID,
              plan: selectedPlan,
              group: selectedGroup,
              logID: results.data.insertId
          }
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
          <FormHelperText>Select from all your workout plans.</FormHelperText>
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
          <FormHelperText>Select from plan's sub-groups.</FormHelperText>
        </FormControl>

        {(selectedPlan.id && selectedGroup.id) 
          ? <IconButton 
              className={classes.button} 
              aria-label="Delete"
              onClick={this.createNewWorkOut}
              >
            {/* <Link to="/new"> */}
              <ArrowForwardIosIcon fontSize="large"/>
            {/* </Link> */}
            </IconButton>
          : <ArrowForwardIosIcon fontSize="large"/>}

          {/* <Route path="/new" render={(props)=> (<NewWorkoutTable group={selectedGroup}/>)}/> */}

          
      </div>  
    )
  }
}

export default withStyles(styles)(CreateNewWorkout);