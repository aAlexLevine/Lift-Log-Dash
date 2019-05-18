import React from 'react';
import axios from 'axios';
import BarChart from './BarChart.jsx'
// const helpers = require('../../utils/helpers.js')
import { MDYYformat } from '../../utils/helpers.js'

export default class LastWeeksBarChart extends React.Component {
    constructor() {
      super();
      this.state = {
        data: [],
        uniqueExercises: {}
      }
    }

    componentDidMount() {
      axios.get('/api/dash/getLastXLogIds', {
          params: {
            qty: 7
          }
        })
        .then(logs => logs.data.map(log => this.getCorrespondingSetsRestData(log.id)))
        .then(arrOfPromises => {
          Promise.all(arrOfPromises)
            .then(logs => {
              const data = logs.map(log => this.organizeSetsRestData(log.data))
              const formatted = this.formatForReCharts(data)
              console.log('formatted', formatted)
              this.setState({data: formatted[0], uniqueExercises: formatted[1]})
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
      // console.log('unorganzied records', records)
      let reducedRecords = records.reduce((acc, curr) => {
        if (!acc[curr.exercise]) {
          acc[curr.exercise] = { sets: [] }
        }
        if (!acc.date) {
          acc.date = curr.dateCreated
        }
        if (!acc.group) {
          acc.group = curr.plan_group
        }
        // ---
        // When DB gets reset with new schema add planName prop
        // Then adjust dataSet in formatForReCharts
        // ---
        // if(!acc.planName) {
        //    acc.planName = curr.planName
        // }
        acc[curr.exercise].sets.push( {setNum: curr.setNum, reps: curr.reps, weight: curr.weight, rest: curr.rest } )
        return acc
      }, {})
      // console.log('organized records',reducedRecords)
      return reducedRecords
    }

    formatForReCharts = (logSets) => {
      const calculateMaxLift = (arrOfSetObjs) => {
        const max = Math.max(...arrOfSetObjs.map(set => set.weight))
        return max > 0 ? max : null
      }
      const uniqueExercises = {}
      const formatted = logSets.map((logSet) => {
        // * Add planName here *
        const dataSet = {name: `${MDYYformat(logSet.date)} -*- | ${logSet.group} `}
        for (let exercise in logSet) {
          if (exercise !== 'date' && exercise !== 'group') {
            if (!uniqueExercises[exercise]) {
              uniqueExercises[exercise] = exercise
            }
            dataSet[exercise] = calculateMaxLift(logSet[exercise].sets)
          }
        }
        return dataSet
      }).reverse()
      return [formatted, uniqueExercises]
    }

    render() {
      return (
        <div>
          <BarChart
            data={this.state.data}
            uniqueExercises={this.state.uniqueExercises}
          />
        </div>
      )
    }
  }
