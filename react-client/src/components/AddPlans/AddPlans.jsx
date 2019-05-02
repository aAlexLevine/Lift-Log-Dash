import React from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined';
import CardActions from '@material-ui/core/CardActions';

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
  }
})

// Add a check that plan name is not already being used by this user

class AddPlans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      groups: ['Starter'],
      planForm: {
        planName: '',
        groups: [
          {
            title: 'Starter', 
            defaultSets: '', 
            exercises: [
              {name: '', defaultReps: 5}, 
              {name: '', defaultReps: 5}, 
              {name: '', defaultReps: 5} 
            ]
          }
        ]
      }
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Card>
          <CardHeader title={ <FormControl>
            <InputLabel htmlFor="name" classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}>
              Plan Name
            </InputLabel>
            <Input autoFocus id="name" className={classes.inputView} classes={{
                    underline: classes.cssUnderline,
                  }} />
            </FormControl>
            }
            />
            <Divider variant="middle" />

            <CardContent className={classes.cardContent}>
              <Typography align="justify" variant="subtitle1">Groups</Typography>
              <Divider/>
              <Button className={classes.buttonAddGroup} variant="outlined" color="primary"  aria-label="AddBox">
                Add group
              </Button>
            
              
              <div className={classes.root}>
                <Grid container spacing={24}>
                  {this.state.planForm.groups.map((group, i) => (
                  <Grid item xl={4} key={group}>
                    <Card>
                      <CardHeader className={classes.groupCardHeader} title={ 
                        <div >
                          <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="groupTitle" classes={{
                                          root: classes.cssLabel,
                                          focused: classes.cssFocused,
                                        }}>
                              Group Name
                            </InputLabel>
                            <Input id="groupTitle" className={classes.inputView} classes={{
                                            underline: classes.cssUnderline,
                                          }} />
                          </FormControl>

                          <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="setCount" classes={{
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                      }}>
                            Sets
                          </InputLabel>
                          <Input type ="number" id="setCount" className={classes.defaultSetInputView} classes={{
                                          underline: classes.cssUnderline,
                                        }} />
                          </FormControl>
                        </div>
                        }
                        />

                        <Divider variant="middle" />

                        <CardContent >
                          {this.state.planForm.groups[i].exercises.map(exercise => (
                            <div>
                              <IconButton className={classes.delete} aria-label="Delete">
                                <DeleteIcon />
                              </IconButton>
                              <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="exerciseName" classes={{
                                              root: classes.cssLabel,
                                              focused: classes.cssFocused,
                                            }}>
                                  Exercise
                                </InputLabel>
                                <Input id="exerciseName" className={classes.inputView} classes={{
                                                underline: classes.cssUnderline,
                                              }} />
                              </FormControl>

                              <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="defaultReps" classes={{
                                              root: classes.cssLabel,
                                              focused: classes.cssFocused,
                                            }}>
                                  Reps
                                </InputLabel>
                                <Input type ="number" id="defaultReps" className={classes.defaultSetInputView} classes={{
                                                underline: classes.cssUnderline,
                                              }} />
                          
                              </FormControl>
                            </div>
                          ))}
                        <CardActions disableActionSpacing>
                          <Button className={classes.leftButtons} variant="outlined" color="primary"  aria-label="AddBox" size="small">
                            Add Exercise
                          </Button>
                        </CardActions>
                      </CardContent>
                      <Divider/>
                      
                      <CardActions>
                        <Button size="small" color="primary" className={classes.leftButtons}>
                          Remove Group
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  ))}
                </Grid>
              </div>

            </CardContent>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(AddPlans);