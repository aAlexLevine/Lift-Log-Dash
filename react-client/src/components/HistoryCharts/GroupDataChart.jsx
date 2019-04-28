import React from 'react';
import axios from 'axios';
import ChartByGroup from './ChartByGroup.jsx'
// import c3 from 'c3';
// import 'c3/c3.css';

class GroupDataChart extends React.Component {
  constructor() {
    super();
    this.state = {
      exercisesToChart: {},
      uniqueExercises: {},
      maxLiftsData: [],
      averageRepLiftsData: []
    }
    this.myRef = React.createRef();

    this.getSetsRestData = this.getSetsRestData.bind(this)
    this.organizeSetsRestData = this.organizeSetsRestData.bind(this)
    // this.formatDataForCharts = this.formatDataForCharts.bind(this)
    this.calculateMaxLift = this.calculateMaxLift.bind(this)
    this.getLogsCorrespondingSetsData = this.getLogsCorrespondingSetsData.bind(this)
  }

  componentDidMount() {
    this.getLogsCorrespondingSetsData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.logs !== this.props.logs) {
      this.getLogsCorrespondingSetsData()
    }
  }

  getLogsCorrespondingSetsData() {
    Promise.all(this.props.logs.map((log) => this.getSetsRestData(log.id)))//.catch
      .then(logSets => {
        console.log(logSets)
        this.formatForReCharts(logSets)
        // this.formatDataForCharts(logSets)
      })
  }

  getSetsRestData(logID) {
    return axios.get('/api/getSetsRestByLogid', {
      params: {
        logID: logID
      }
    })
    .then(log => this.organizeSetsRestData(log.data))
  }

  organizeSetsRestData(records) {
    let reducedRecords = records.reduce((acc, curr) => {
      if(!this.state.exercisesToChart[curr.exercise]) {
        this.setState({exercisesToChart: {...this.state.exercisesToChart, [curr.exercise]: true}})
      }
      if (!acc[curr.exercise]) {
        acc[curr.exercise] = { sets: [] }
      }
      if (!acc.date) {
        acc.date = curr.dateCreated
      }
      acc[curr.exercise].sets.push( {setNum: curr.setNum, reps: curr.reps, weight: curr.weight, rest: curr.rest } )
      return acc
    }, {})
    return reducedRecords
  }
      
  formatForReCharts = (logSets) => {
    const uniqueExercises = {}
    const dataFormater = (calculate) => { 
      return logSets.map((logSet) => {
        const dateStr = new Date(logSet.date)
        const dataSet = {name: dateStr.toDateString()}
        for (let exercise in logSet) {
          if (exercise !== 'date') {
            if (!uniqueExercises[exercise]) {
              uniqueExercises[exercise] = exercise
            }
            dataSet[exercise] = calculate(logSet[exercise].sets)
          }
        }
        return dataSet
      })
    }
    const maxLifts = dataFormater(this.calculateMaxLift)
    const averageRepLifts = dataFormater(this.calculateAverageLift)

    this.setState({
      maxLiftsData: maxLifts,
      averageRepLiftsData: averageRepLifts, 
      uniqueExercises: uniqueExercises
    })
    console.log('recharts--', averageRepLifts)
  }


  calculateMaxLift(arrOfSetObjs) {
    const max =  Math.max(...arrOfSetObjs.map( set => set.weight))
    return max > 0 ? max : null
  }

  calculateAverageLift = (sets) => {
    const totalSets = sets.length
    const totalWeightLifted = sets.reduce((sum, set) => sum + (set.weight * set.reps), 0)
    const totalRepsPerformed = sets.reduce((sum, set) => sum + set.reps, 0)
    const averageRep = totalWeightLifted / totalRepsPerformed
    const averageWeightUsed = sets.reduce((sum, set) => sum + set.weight, 0) / totalSets

    // console.log('total weights lifted', totalWeightLifted)
    // console.log('totalRepsPerformed', totalRepsPerformed)
    return averageRep || null
  }

  render() {
    return (
      <div style={chartContainer}>
        <div style={groupTitle}>{this.props.groupTitle}</div>
        <ChartByGroup 
            maxLifts={this.state.maxLiftsData} 
            avgRep={this.state.averageRepLiftsData}
            uniqueExercises={this.state.uniqueExercises}/>
      </div>
    )
  }
}

export default GroupDataChart;

const chartContainer = {
  width: '100%',
  marginBottom: '100px'
}

const chart = {
  width: '100%'
}

const groupTitle = {
  fontSize: '30px',
  fontFamily: 'Montserrat',
}