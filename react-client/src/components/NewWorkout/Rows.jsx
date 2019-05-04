import React from 'react';
import DataCellInput from './DataCellInput.jsx';
import DataCellTimer from './DataCellTimer.jsx';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import Grow from '@material-ui/core/Grow';

const firstColumn = {  
  position: 'sticky',
  left: '0',
  zIndex: 1,
  backgroundColor: 'white'
 }

const styles = (theme) => ({
  toggle: {
    padding: '0px',
    float: 'left'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  contentContainer: {
    minWidth: '110px'
  }
})

class Rows extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      togglePreviousWorkouts: false,
      expanded: null
    }
  }

  togglePreviousWorkouts = () => {
    this.setState({togglePreviousWorkouts: !this.state.togglePreviousWorkouts})
  }

  render() {
    const { classes, formLocation, exercise, updateExerciseValues } = this.props;
    return (
      <React.Fragment>
        <TableRow hover={true}>
          <TableCell padding="default" style={firstColumn }>
            <div className={classes.contentContainer}>
              {this.props.exercise.name}
             <div>
              <IconButton 
                className={
                  classNames(classes.expand, classes.toggle, { [classes.expandOpen]:this.state.togglePreviousWorkouts, })
                } 
                onClick={this.togglePreviousWorkouts}
                aria-expanded={this.state.togglePreviousWorkouts} 
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
              </div>
            </div>

          </TableCell>
          {[... new Array(this.props.setCount)].map((header, i) => (
            <React.Fragment key={'frag' + i}>
              <DataCellInput set={'set' + (i + 1)}
                            formLocation={formLocation['set' + (i + 1)]} 
                            updateExerciseValues={updateExerciseValues}
                            exercise={this.props.exercise.name}
              />
              {i + 1 < this.props.setCount ? 
                <DataCellTimer setNum={i + 1}
                              updateRestTime={this.props.updateRestTimePropertyForDataCell} 
                              exercise={this.props.exercise}
                              /> 
                              : null}  
            </React.Fragment>
          ))}
        </TableRow>

      {/* TODO: sort each array, turn into separate component */}
      {this.state.togglePreviousWorkouts 
        ? this.props.previousWorkouts.map((workout, i) =>  (
            <Grow key={'grow'+i}
                in={this.state.togglePreviousWorkouts}
                style={{ transformOrigin: '0 0 0' }}
                timeout={{enter: 500*(i+1), exit: 2000}}
            >
            <TableRow>
              <TableCell align="right" style={firstColumn}>{new Date(workout.date).toDateString()}</TableCell>
                {workout[this.props.exercise.name].sets.map((set, i) => (
                  <React.Fragment key={'setRestHistory' + i}>
                    <TableCell align="center">{set.reps} x {set.weight}</TableCell>
                    <TableCell>{set.rest}</TableCell>
                  </React.Fragment>
              ))} 
            </TableRow>
            </Grow>
          )) 
        : null
      }
     
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Rows);

