import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined';
import CardActions from '@material-ui/core/CardActions';
import update from 'immutability-helper';


const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
  groupCardHeader: {
    display: 'flex'
  },
  defaultSetInputView: {
    maxWidth: '80px'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardContent: {
    marginLeft: '20px'
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500],
    },
  },
  addInput: {
    display: 'flex'
  },
  buttonAddGroup: {  
    margin: '30px 30px 30px 0 '
  },
  buttonAddExercise: {
    marginLeft: 'auto'
  },
  delete: {
    marginTop: '26px',
    marginRight: '13px',
    padding: '0px',
  },
  leftButtons: {
    marginLeft: 'auto'
  },
  save: {
    marginTop: '10px',
    marginBottom: '10px'
  }
})

// TODO:
// Add a check that plan name is not already being used by this user
// Check no duplicate exercise/ group names in planForm
// Make all inputs required

class AddPlans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planForm: {
        planName: '',
        groups: [
          {
            title: '', 
            defaultSets: '', 
            exercises: [
              {name: '', defaultReps: ''}, 
              {name: '', defaultReps: ''}, 
              {name: '', defaultReps: ''} 
            ]
          }
        ]
      }
    }
  }

  updatePlanName = (e) => {
    const { planForm } = this.state
    const copyForm = update(planForm, {planName: {$set: e.target.value}})
    this.setState({planForm: copyForm})
  }

  updateGroup = (e, index, prop) => {
    const { planForm } = this.state
    const copyForm = update(planForm, {groups:{[index]: {[prop]: {$set: e.target.value}}}})
    this.setState({planForm: copyForm})
  }

  updateExercise = (e, groupIndex, exerciseIndex, prop) => {
    const { planForm } = this.state
    const copyForm = update(planForm, 
      {groups:{[groupIndex]: {exercises:{[exerciseIndex]: {[prop]: {$set: e.target.value}}}}}})
    this.setState({planForm: copyForm})
  }

  addGroup = () => {
    const newGroup =   {
      title: '', 
      defaultSets: '', 
      exercises: [
        {name: '', defaultReps: ''}, 
        {name: '', defaultReps: ''}, 
        {name: '', defaultReps: ''} 
      ]
    }
    const { planForm } = this.state
    const copyForm = update(planForm, {groups: {$push: [newGroup]}})
    this.setState({planForm: copyForm})
  }

  removeGroup = (index) => {
    const { planForm } = this.state
    const copyForm = update(planForm, {groups: {$splice: [[index, 1]]}})
    this.setState({planForm: copyForm})
  }

  addExercise = (groupIndex) => {
    const newExercise = {name: '', defaultReps: ''}
    const { planForm } = this.state
    const copyForm = update(planForm, 
      {groups: {[groupIndex]: {exercises: {$push: [newExercise]}}}})
    this.setState({planForm: copyForm})
  }

  removeExercise = (groupIndex, exerciseIndex) => {
    const { planForm } = this.state
    const copyForm = update(planForm, 
      {groups: {[groupIndex]: {exercises: {$splice : [[exerciseIndex, 1]]}}}})
      this.setState({planForm: copyForm})
  }

  submit = () => {
    axios.post('/api/dash/createNewPlan', this.state.planForm)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Card>
          <CardHeader 
            title={ 
              <FormControl>
                <InputLabel htmlFor="name" 
                    classes={{root: classes.cssLabel, focused: classes.cssFocused,}
                }>
                  Plan Name
                </InputLabel>
                <Input autoFocus id="name" 
                    className={classes.inputView} 
                    classes={{underline: classes.cssUnderline}}
                    onChange={this.updatePlanName} 
                />
              </FormControl>
            }
            />
            <Divider variant="middle" />

            <CardContent className={classes.cardContent}>
              <Typography align="justify" variant="subtitle1">Groups</Typography>
              <Divider />
              <Button className={classes.buttonAddGroup} 
                  variant="outlined" 
                  color="primary" 
                  aria-label="AddBox"
                  onClick={this.addGroup}>
                Add group
              </Button>


              <div className={classes.root}>
                <Grid container spacing={24}>
                  {this.state.planForm.groups.map((group, i) => (
                  <Grid item xl={4} key={i}>
                    <Card>
                      <CardHeader className={classes.groupCardHeader} 
                        title={ 
                          <div>
                            <FormControl className={classes.formControl}>
                              <InputLabel htmlFor={`groupTitle${i}`} 
                                  classes={{root: classes.cssLabel, focused: classes.cssFocused}}
                              >
                                Group Name
                              </InputLabel>
                              <Input id={`groupTitle${i}`} className={classes.inputView} 
                                  classes={{underline: classes.cssUnderline}} 
                                  onChange={(e)=> this.updateGroup(e, i, 'title')}
                                  value={this.state.planForm.groups[i].title}
                              />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="setCount" 
                                  classes={{root: classes.cssLabel, focused: classes.cssFocused}}
                              >
                                Sets
                              </InputLabel>
                              <Input type="number" id="setCount" className={classes.defaultSetInputView} 
                                  classes={{underline: classes.cssUnderline}} 
                                  onChange={(e)=> this.updateGroup(e, i, 'defaultSets')}
                                  value={this.state.planForm.groups[i].defaultSets}
                              />
                            </FormControl>
                          </div>
                        }
                      />

                      <Divider variant="middle" />

                      <CardContent>
                        {this.state.planForm.groups[i].exercises.map((exercise, idx) => (
                          <div key={idx}>
                            <IconButton className={classes.delete} 
                                aria-label="Delete" 
                                onClick={()=> {this.removeExercise(i, idx)}}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="exerciseName" 
                                  classes={{root: classes.cssLabel, focused: classes.cssFocused}}
                              >
                                Exercise
                              </InputLabel>
                              <Input id="exerciseName" className={classes.inputView} 
                                  classes={{underline: classes.cssUnderline}} 
                                  onChange={(e)=> this.updateExercise(e, i, idx, 'name')}
                                  value={this.state.planForm.groups[i].exercises[idx].name}
                              />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="defaultReps" 
                                  classes={{root: classes.cssLabel, focused: classes.cssFocused}}
                              >
                                Reps
                              </InputLabel>
                              <Input type="number" id="defaultReps" 
                                  className={classes.defaultSetInputView} 
                                  onChange={(e) => this.updateExercise(e, i, idx, 'defaultReps')}
                                  value={this.state.planForm.groups[i].exercises[idx].defaultReps}
                                  classes={{underline: classes.cssUnderline,}}
                              />

                            </FormControl>
                          </div>
                        ))}
                        <CardActions disableActionSpacing>
                          <Button className={classes.leftButtons} 
                              variant="outlined" 
                              color="primary" 
                              aria-label="AddBox"
                              size="small" 
                              onClick={()=> this.addExercise(i)}
                            >
                            Add Exercise
                          </Button>
                        </CardActions>
                      </CardContent>
                    
                      <Divider />

                      <CardActions>
                        <Button className={classes.leftButtons} 
                            size="small" 
                            color="default" 
                            onClick={()=> this.removeGroup(i)}
                        >
                          Remove Group
                        </Button>
                      </CardActions>
                    </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </CardContent>
            <Divider />
            <CardActions>
              <Button className={classes.save} 
                  color="primary" 
                  variant="contained" 
                  size="large"
                  onClick={this.submit}
                  >
                  submit plan
              </Button>
                  
            </CardActions>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(AddPlans);