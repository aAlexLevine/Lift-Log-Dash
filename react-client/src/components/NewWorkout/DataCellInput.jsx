import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  margin: {
    margin: 5,
    // width: '100%'3
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
  inputContainer:{display:'flex'},
  inputView: {minWidth: '30px'},
  xDivider: {
    marginTop: '23px',
    marginLeft: '20px',
    marginRight: '20px'
  }
})

class DataCellInput extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      weight: '',
      reps: ''
    }
    this.handleWeightChange = this.handleWeightChange.bind(this)
    this.handleRepsChange = this.handleRepsChange.bind(this)
  }

  handleWeightChange(e) {
    let reps
    this.state.reps === '' ? reps = this.props.defaultreps : reps = this.state.reps
    this.setState({
      weight: e.target.value
    }, () => {
      this.props.updateWeightPropertyForDataCell(this.props.exercise.name, this.props.setNum, this.state.weight, reps)
    })
  }

  handleRepsChange (e) {
    this.setState({reps: e.target.value})
    this.props.updateRepsPropertyForDataCell(this.props.exercise.name, this.props.setNum, e.target.value)
  }

  render() {
    const { classes } = this.props;
    return (
      <TableCell >
      <div className={classes.inputContainer}>
        {/* <button onClick={()=>this.setState()}>update</button> */}
        {/* <input  type="text" defaultValue={this.props.defaultreps} onChange={this.handleRepsChange}/>  */}
        <div className={classes.padd}>
        <FormControl className={classes.margin}>
        <InputLabel
          htmlFor="reps"
          classes={{
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }}
        >
          Reps
        </InputLabel>
        <Input
          // id="reps"
          className={classes.inputView}
          defaultValue="5"
          classes={{
            underline: classes.cssUnderline,
          }}
        />
      </FormControl>
      </div>
        <div className={classes.xDivider}>x</div>
        {/* <Typography variant="subtitle1">X</Typography> */}
        
        
        {/* <input type="text" value={this.state.weight} onChange={this.handleWeightChange}/> */}
        <FormControl className={classes.margin}>
        <InputLabel
          // htmlFor="weight"
          classes={{
            root: classes.cssLabel,
            focused: classes.cssFocused
          }}
          >
          lbs
          </InputLabel>
          <Input
          // id="weight"
          className={classes.inputView}
          classes={{
            underline: classes.cssUnderline,
          }}
          />
        </FormControl>
        </div> 
      
      </TableCell>
  
    )
  }
}

export default withStyles(styles)(DataCellInput);
// plain with line and subtitle under line
          // <Input
          //   id="adornment-weight"
          //   value={this.state.weight}
          //   onChange={this.handleChange('weight')}
          //   aria-describedby="weight-helper-text"
          //   endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
          //   inputProps={{
          //     'aria-label': 'Weight',
          //   }}
          // />


          // completely bare
          // <InputBase className={classes.margin} defaultValue="Naked input" />
