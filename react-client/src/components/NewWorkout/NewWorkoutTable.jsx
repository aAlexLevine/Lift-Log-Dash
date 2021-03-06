import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Headers from './Headers.jsx'
import Rows from './Rows.jsx'
import purple from '@material-ui/core/colors/purple';


const firstColumn = {
  position: 'sticky',
  left: '0',
  zIndex: 1,
  backgroundColor: 'white',
  flexWrap: 'wrap',
}

const styles = (theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 700,
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
  topSpacer: {
    // height: '80px'
    backgroundColor: purple[500],
    width: '100%'
  },
  headerText: {
    color: 'white'
  }
});

const NewWorkoutTable = (props) => {
  const { classes, updateExerciseValues, planName, groupTitle, date} = props;
  const dateStr = new Date(date).toDateString()
  return (
    <div >
      <Card className={classes.root}>
        <CardHeader className={classes.topSpacer}
          title={dateStr}
          classes={{title: classes.headerText, subheader: classes.headerText}}
          subheader={`Plan: ${planName} | Group: ${groupTitle}`}
        />
        <Divider variant="middle" />
        <CardContent>
    
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell style={firstColumn}> Exercise </TableCell>
              {[... new Array(props.setCount)].map((header, idx) => (
                <Headers key={idx} numOfHeaders={props.setCount} idx={idx}/>
              ))}     
            </TableRow>
          </TableHead>
          
          <TableBody>
            {props.exercises.map((exercise, i) => (
                <Rows key={i}
                        formLocation={props.dataCellInputs[exercise.name]}
                        updateExerciseValues= {updateExerciseValues} 
                        exercise={exercise} 
                        setCount={props.setCount}  
                        updateRestTimePropertyForDataCell={props.updateRestTimePropertyForDataCell}
                        previousWorkouts={props.previousWorkouts}
            />))}
          </TableBody>
        </Table>

        </CardContent>
      </Card>
    </div>
  );
}

export default withStyles(styles)(NewWorkoutTable);

