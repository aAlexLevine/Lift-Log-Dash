import React from 'react';
import axios from 'axios';
import NewWorkoutTable from './NewWorkoutTable.jsx'
import update from 'immutability-helper';

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
    const { userID, plan: { id }, group: { title } } = this.props.details
    axios.get('/api/dash/getLastThreeLogIds', {
      params: {
        userID: userID,
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
      [exercise]: {[set]: {[prop]: {$set: value}}}
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

  submitSets() {
    const exerciseRows = this.state.dataCellInputs
    let postObj
    for (let row in exerciseRows) {
      for (let set in exerciseRows[row]) {
        postObj = {
          logID: this.props.logID,
          data: exerciseRows[row][set]
        }
        axios.post('/insertSets', postObj)
        .then()
        .catch(err => console.log(err))
      }
    }
    console.log('submitted')
  }

  render() {
    const { exercises, previousWorkouts, dataCellInputs } = this.state
    const { setCount } = this.props.details.group
    return (
      <div>
        <NewWorkoutTable 
           exercises={exercises}
           setCount={setCount}
           previousWorkouts={previousWorkouts}
           dataCellInputs={dataCellInputs}
           updateExerciseValues={this.updateExerciseValues}
           updateRestTimePropertyForDataCell={this.updateRestTimePropertyForDataCell}
        />
      </div>
    )
  }
}

export default TableContainer;