import TableCell from '@material-ui/core/TableCell';
import React from 'react';
// import TimerInterface from './TimerInterface.jsx'
const prettyMs = require('pretty-ms');
// const parseMS = require('parse-ms');
import IconButton from '@material-ui/core/IconButton';
import TimerIcon from '@material-ui/icons/Timer';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';


const styles = (theme) => ({
  container: {
    display: "flex"
  },
  formattedTime:{
    minWidth: '100px'
  },
  timerButton: {
    padding: '0px',
    // float: 'left'
  },
  timerButtonActive: {
    padding: '0px',
    color: 'red'
  },
  buttonDepressed: {
    transform: 'translateY(4px)'
  }
})


class DataCellTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedTime: '0s',
      toggleStopTimer: false,
      // px : 0,
      // clockColor: 'black',
      // toggleInterface: false,
      // bottomCSS: -69,
      timeElapsed: 0,
      savedElapsedTime: 0
    }
  } 

  componentWillUnmount() {
    clearInterval(this.timerInterval)
  }

  startInterval = () => {
    const timeStarted = Date.now()
    this.timerInterval = setInterval(() => this.tick(timeStarted), 1000)
    this.setState({toggleStopTimer: !this.state.toggleStopTimer})
  }

  tick = (timeStarted) => {
    const oneSecondPassing = Date.now()
    const timeElapsed = (oneSecondPassing - timeStarted) + this.state.savedElapsedTime
    const formattedTime = prettyMs(timeElapsed)
    this.setState({timeElapsed: timeElapsed, formattedTime: formattedTime})
    if (timeElapsed > 7200000) {
      this.stopTmer()
    }
  }

  stopTmer = (lastTimeDiff) => {
    this.setState({
      toggleStopTimer: !this.state.toggleStopTimer,
      savedElapsedTime: this.state.timeElapsed
    })
    // this.props.updateRestTime(this.props.exercise.name, this.props.setNum, this.state.elapsedTime)
    clearInterval(this.timerInterval)
  }

  toggleButtonDepressed = () => {
    this.setState({buttonDepressed: !this.state.buttonDepressed})
  }


  render() {
    const { classes } = this.props;

    const clockPressed = {
      fontSize:'25px',
      cursor: 'pointer',
      transform: `translateY(${this.state.px}px)`,
      color: `${this.state.clockColor}`,
      margin: 'auto auto',
      padding: '8px'
    }

    return (
      <TableCell>
        <div className={classes.container}>
            {/* <IconButton
              className={classes.timerButton}
               onMouseDown={this.handleMouseDown}
               onMouseUp={this.handleMouseUp}
               onClick={this.state.toggleStopTimer ? this.stopTmer : this.startTimer} 
            >
              <TimerIcon/>
            </IconButton> */}

            <IconButton
              className={
                classNames(this.state.toggleStopTimer ? classes.timerButtonActive : classes.timerButton, 
                            this.state.buttonDepressed ? classes.buttonDepressed : null
                )
              }
               onClick={this.state.toggleStopTimer ? this.stopTmer : this.startInterval}
               onMouseDown={this.toggleButtonDepressed}
               onMouseUp={this.toggleButtonDepressed}

            >
                <TimerIcon/>
            </IconButton>




    
            
              <div className={classes.formattedTime}>
                <Typography align="center" variant="subtitle1" gutterBottom>
                  {this.state.formattedTime}
                </Typography>
              
              </div>
                {/* <i style={ellipsis} className="fas fa-ellipsis-h" onClick={(event)=>this.toggleInterface(event, true)}></i> */}
                {/* {this.state.toggleInterface ? <TimerInterface toggleInterface={this.toggleInterface} bottomCSS={this.state.bottomCSS} updateBottomCSS={this.updateBottomCSS}/> : null} */}
              </div>
        
      </TableCell>
    )
  }
}

export default withStyles(styles)(DataCellTimer);

//TODO:
//use prettyMS lib, display inside a timer icon thats clickable, animate to depress on click
//green circle to start, turns red - to stop, three line menu to edit manually
//add func to update the datacell state object


// -Format timer display to 00 : 00 : 00
    // const parsedObj = parseMS(timeDiff)
    // let { hours, minutes, seconds, milliseconds } = parsedObj
    // seconds < 10 ? seconds = `0${seconds}` : null
    // minutes < 10 ? minutes = `0${minutes}` : null
    // hours < 10 ? hours = `0${hours}` : null

    // this.setState({formattedTime: `${hours} : ${minutes} : ${seconds}`})
    // if (hours === 2) {
    //   this.stopTmer()
    // }
  // }