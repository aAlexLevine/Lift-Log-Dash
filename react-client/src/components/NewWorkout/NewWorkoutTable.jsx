import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
// import zIndex from '@material-ui/core/styles/zIndex';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import Headers from './Headers.jsx'
import Rows from './Rows.jsx'

const styles = (theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 700,
    // borderCollapse: 'collapse',

  },
  tab: {
    position: 'relative',
    zIndex: 1,
    width: '97%',
    margin: 'auto',
    bottom: '-60px',
    // backgroundColor: '#00daf1'//'#0072ff',
    // boxShadow: '5px 10px 10px grey'
   
  },
  title: {
    // color: 'white'
   },
  topSpacer: {
    // height: '80px'
  }
});
// #0072ff


// function NewWorkoutTable(props) {
class NewWorkoutTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exercises: [],
      setCount: '',
      previousWorkouts: [],
      dataCellInputs: {},
      a:''

    }
  }

  a = () => {
    // this.setState({a:'testing'}, ()=>console.log('aaaaaaa'))
    // this.forceUpdate()
    // this.getLastThreeLogIds()
    // this.buildStateObjForAllDataCells()
  }

  componentDidMount() {
    // this.getDate()
    const { group } = this.props.details
    axios.get('/api/dash/getExercisesByGroup', {
        params: {
          groupID: group.id
        }
      })
      .then(res => {
        console.log(res.data)
        this.setState({
          exercises: res.data,
          setCount: group.setCount
        }, 
        this.buildStateObjForAllDataCells
      )})

      .then(this.getLastThreeLogIds)
      .catch(err => console.log(err))
    
  }

  getLastThreeLogIds = () => {
    const { userID, plan: { id }, group: { title } } = this.props.details
    const getSetsRestData = (logID) => {
      return axios.get('/api/dash/getSetsRestByLogid', {
        params: {
          logID: logID
        }
      })
      .then(log => this.organizeSetsRestData(log.data))
    }

    axios.get('/api/dash/getLastThreeLogIds', {
      params: {
        userID: userID,
        planID: id,
        group: title
      }
    })
      .then((logs) => {
        return Promise.all(logs.data.map(log => getSetsRestData(log.id)))
      })
      .then(logSets => {
        console.log(logSets)
        this.setState({previousWorkouts: logSets})
      })
      .catch(err => console.log(err))
      // if (setsRest.data.length > 0) {
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

  buildStateObjForAllDataCells = () => {
    const { setCount } = this.props.details.group
    const allDataCells = {}
    for (let exercise of this.state.exercises) {
      let name = exercise.name
        allDataCells[name] = {}
        for (let i = 1; i <= setCount; i++) {
          allDataCells[name]['set' + i] = {exercise: name, setNum: i, weight: null, reps: null, rest: null}
        }
    }
    this.setState({dataCellInputs: allDataCells})
  }

  updateWeightPropertyForDataCell = (exercise, setNum, weight, reps) => {
    if (weight === '') { reps = null } 
    let copyDataCells = update(this.state.dataCellInputs, {
      [exercise]: {['set' + setNum]: {weight: {$set: weight}}},
    })
    this.setState({dataCellInputs: copyDataCells}, () => {
    this.updateRepsPropertyForDataCell(exercise, setNum, reps)
      console.log('weight changed', this.state.dataCellInputs)
    })
  }

  updateRepsPropertyForDataCell = (exercise, setNum, reps) => {
    const copyDataCells = update(this.state.dataCellInputs, {
      [exercise]: {['set' + setNum]: {reps: {$set: reps}}}
    })
    this.setState({dataCellInputs: copyDataCells}, () => 
      console.log('reps changed', this.state.dataCellInputs))
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

  // addExercise(name) {
  //   //set state add exercise 
  //   this.setState({exercises: [...this.state.exercises, name]})
  // }

  // //remove and edit 
  // handleSelect(event) {
  //   this.setState({exercises: [...this.state.exercises, event.target.value]})
  // }
  render() {
    const { classes } = this.props;
    const date = new Date()
    const dateStr = date.toDateString()
    return (
      // <div>
      //   <h1>test</h1>
      //   <button onClick={this.a}>aaaaaa</button>
      // </div>
      <div >
      <Card className={classes.tab}> 
        {/* <CardHeader disableTypography={true} 
            title={<Typography variant="subtitle1" className={classes.title}> This is the tab</Typography>}
            // subheader={<Typography variant="subtitle1" className={classes.title}> Date here</Typography>}
            />  */}
      </Card>
      <Card className={classes.root}>
        <CardHeader className={classes.topSpacer}
          title={dateStr}
          subheader="Plan: 5 x 5 | Group: A"
        />
        <Divider variant="middle" />
        <CardContent>
    
         <Table className={classes.table}>
           <TableHead>
             <TableRow>
                <TableCell style={firstColumn}> Exercise </TableCell>
              {[... new Array(this.state.setCount)].map((header, idx) => (
                <Headers key={idx} numOfHeaders={this.state.setCount} idx={idx}/>
              ))}     
            </TableRow>
          </TableHead>
          
          <TableBody>
            {this.state.exercises.map((exercise, i) => (
              <Rows key={i} 
                        exercise={exercise} 
                        defaultreps={exercise.numOfReps}
                        setCount={this.state.setCount}  
                        updateWeightPropertyForDataCell={this.updateWeightPropertyForDataCell}
                        updateRepsPropertyForDataCell={this.updateRepsPropertyForDataCell}
                        updateRestTimePropertyForDataCell={this.updateRestTimePropertyForDataCell}
                        previousWorkouts={this.state.previousWorkouts}
                        />))}
          </TableBody>
        </Table>

        </CardContent>
      </Card>
    </div>
    );
  }
}

export default withStyles(styles)(NewWorkoutTable);

const firstColumn = {  
  //  borderBottom: '1px solid black',
  //  padding: '8px',
   position: 'sticky',
   left: '0',
   zIndex: 1,
   backgroundColor: 'white',//'#ab47bc',
  // color: 'blue',//'#ab47bc',
      flexWrap: 'wrap',
  
  }


    //     <Table className={classes.table}>
    //       <TableHead>
    //         <TableRow>
    //           <TableCell>Dessert (100g serving)</TableCell>
    //           <TableCell align="right">Calories</TableCell>
    //           <TableCell align="right">Fat (g)</TableCell>
    //           <TableCell align="right">Carbs (g)</TableCell>
    //           <TableCell align="right">Protein (g)</TableCell>
          //   </TableRow>
          // </TableHead>
    //       <TableBody>
    //         {data.map(n => (
    //           <TableRow key={n.id}>
    //             <TableCell component="th" scope="row">
    //               {n.name}
    //             </TableCell>
    //             <TableCell align="right">{n.calories}</TableCell>
    //             <TableCell align="right">{n.fat}</TableCell>
    //             <TableCell align="right">{n.carbs}</TableCell>
    //             <TableCell align="right">{n.protein}</TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>