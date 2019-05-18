import React from 'react';
import axios from 'axios';
import NewWorkoutTable from './NewWorkoutTable.jsx'
import update from 'immutability-helper';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import purple from '@material-ui/core/colors/purple';
import { Redirect } from 'react-router-dom'
import { YYYYMMDDformat } from '../../utils/helpers.js';

const styles = theme => ({
  margin: {
    // margin: theme.spacing.unit,
    marginTop: '20px'
  },
  cssRoot: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },

})

class TableContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      exercises: [],
      setCount: '',
      previousWorkouts: [],
      dataCellInputs: {}
    }
  }

  componentDidMount() {
    const { group } = this.props.details
    axios.get('/api/dash/getExercisesByGroup', {
        params: {
          groupID: group.id
        }
      })
      .then(res => {
        this.buildStateObjForAllDataCells(res.data)
        this.setState({exercises: res.data})
        this.getLastThreeLogIds()
    })
      .catch(err => console.log(err))
  }

  getLastThreeLogIds = () => {
    const { plan: { id }, group: { title } } = this.props.details
    axios.get('/api/dash/getLastThreeLogIds', {
      params: {
        // userID: userID,
        planID: id,
        group: title
      }
    })
    .then(logs => logs.data.map(log => this.getCorrespondingSetsRestData(log.id)))
    .then(arrOfPromises => {
      Promise.all(arrOfPromises)
        .then(logs => {
          const data = logs.map(log => this.organizeSetsRestData(log.data))
          this.setState({previousWorkouts: data})
        })
    })
    .catch(err => console.log(err))
}

  getCorrespondingSetsRestData = (logID) => {
    return axios.get('/api/dash/getSetsRestByLogid', {
      params: {
        logID: logID
      }
    })
  }

  organizeSetsRestData = (records) => {
    let reducedRecords = records.reduce((acc, curr) => {
      if (!acc[curr.exercise]) {
        acc[curr.exercise] = { sets: [] }
      }
      if (!acc.date) {
        acc.date = curr.dateCreated
      }
      acc[curr.exercise].sets.push( {setNum: curr.setNum, reps: curr.reps, weight: curr.weight, rest: curr.rest } )
      return acc
    }, {})
    console.log('---reducedRecords----',reducedRecords)
    return reducedRecords
  }

  buildStateObjForAllDataCells = (exercises) => {
    const { setCount } = this.props.details.group
    const allDataCells = {}
    for (let exercise of exercises) {
      let name = exercise.name
        allDataCells[name] = {}
        for (let i = 1; i <= setCount; i++) {
          allDataCells[name]['set' + i] = {exercise: name, setNum: i, weight: null, reps: exercise.numOfReps, rest: null}
        }
    }
    this.setState({dataCellInputs: allDataCells})
  }

  updateExerciseValues = (exercise, set, prop, value) => {
    console.log('update',exercise)
    const copyForm = update(this.state.dataCellInputs, {
      [exercise]: {[set]: {[prop]: {$set: parseInt(value)}}}
    })
    this.setState({dataCellInputs: copyForm})
  }

  updateRestTimePropertyForDataCell = (exercise, setNum, time) => {  
    console.log('time', time)
    const copyDataCells = update(this.state.dataCellInputs, {
      [exercise]: {['set' + setNum]: {rest: {$set: time}}}
    })
      this.setState({dataCellInputs: copyDataCells}, () => 
      console.log('rest changed', this.state.dataCellInputs))
  }

  submitSets = () => {
    console.log('date after submit', this.props.details.date)
    axios.post('/api/dash/submitWorkout', {
      logID: this.props.details.logID,
      workoutData: this.state.dataCellInputs,
      date: YYYYMMDDformat(this.props.details.date)
    })
    .then(results => {
      console.log(results.data)
      this.setState({redirect: true})
    })
    .catch(err => console.log(err))
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/home"/>
    }
    const { exercises, previousWorkouts, dataCellInputs } = this.state
    const { plan: { planName }, group: { title, setCount }, date } = this.props.details
    const { classes } = this.props
    return (
      <div>
        <NewWorkoutTable 
           exercises={exercises}
           setCount={setCount}
           previousWorkouts={previousWorkouts}
           dataCellInputs={dataCellInputs}
           updateExerciseValues={this.updateExerciseValues}
           updateRestTimePropertyForDataCell={this.updateRestTimePropertyForDataCell}
           groupTitle={title}
           planName={planName}
           date={date}
        />
        <Button
          variant="contained"
          color="primary"
          className={classNames(classes.margin, classes.cssRoot)}
          onClick={this.submitSets}
        >
          Submit
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(TableContainer);