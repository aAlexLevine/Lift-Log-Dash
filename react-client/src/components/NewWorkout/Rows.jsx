import React from 'react';
import DataCellInput from './DataCellInput.jsx';
import DataCellTimer from './DataCellTimer.jsx';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import Slide from '@material-ui/core/Slide';
import Collapse from '@material-ui/core/Collapse';
import Grow from '@material-ui/core/Grow';


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
    this.togglePreviousWorkouts = this.togglePreviousWorkouts.bind(this)
  }

  togglePreviousWorkouts() {
    this.setState({togglePreviousWorkouts: !this.state.togglePreviousWorkouts})
  }

//if set length greater that current total update table headers
  render() {
    const { classes } = this.props;


    return (
      <React.Fragment>
        <TableRow hover={true}>
          <TableCell padding="default" style={firstColumn }>
            <div className={classes.contentContainer}>
             
              {this.props.exercise.name}
             <div>
              <IconButton 
              // className={classes.toggle} onClick={this.togglePreviousWorkouts} aria-label="ExpandMore"
              className={classNames(classes.expand, classes.toggle, {
                [classes.expandOpen]: this.state.togglePreviousWorkouts,
              })}
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
              <DataCellInput setNum={i + 1} 
                            exercise={this.props.exercise}
                            defaultreps={this.props.defaulteps} 
                            updateWeightPropertyForDataCell={this.props.updateWeightPropertyForDataCell} 
                            updateRepsPropertyForDataCell={this.props.updateRepsPropertyForDataCell}
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
      {this.state.togglePreviousWorkouts ? 
        this.props.previousWorkouts.map((workout, i) =>  (
          // <Slide timeout={{enter: 2000, exit:1000}} key={'historyRow' + i} direction="up" in={this.state.togglePreviousWorkouts} mountOnEnter unmountOnExit>
            <Grow key={'grow'+i}
            in={this.state.togglePreviousWorkouts}
            style={{ transformOrigin: '0 0 0' }}
            timeout={{enter: 500*(i+1), exit: 2000}}>
            <TableRow >
              <TableCell align="right" style={firstColumn}>{new Date(workout.date).toDateString()}</TableCell>
                {workout[this.props.exercise.name].sets.map((set, i) => (
                  <React.Fragment key={'setRestHistory' + i}>
                    <TableCell align="center">{set.reps} x {set.weight}</TableCell>
                    <TableCell>{set.rest}</TableCell>
                  </React.Fragment>
              ))} 
            </TableRow>
            </Grow>
            // </Slide>
        )) : null}
     
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Rows);

const firstColumn = {  
//  borderBottom: '1px solid black',
//  padding: '8px',
 position: 'sticky',
 left: '0',
 zIndex: 1,
 backgroundColor: 'white',//'#ab47bc',
// color: 'blue',//'#ab47bc',
    // flexWrap: 'wrap',

}
