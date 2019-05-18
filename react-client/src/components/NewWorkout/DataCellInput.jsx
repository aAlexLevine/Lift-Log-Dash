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
  margin: {
    margin: 5,
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
  inputContainer: {display:'flex'},
  weightInputView: {minWidth: '50px'},
  repsInputView: {minWidth: '30px'},
  xDivider: {
    marginTop: '23px',
    marginLeft: '20px',
    marginRight: '20px'
  }
})


const DataCellInput = (props) => {
  const { classes, formLocation, updateExerciseValues, exercise, set } = props;
  return (
    <TableCell >
      <div className={classes.inputContainer}>
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
          id="reps"
          type="number"
          autoComplete="off"
          className={classes.repsInputView}
          value={formLocation.reps}
          onChange={(e) => updateExerciseValues(exercise, set, 'reps', e.target.value)}
          classes={{
            underline: classes.cssUnderline,
          }}
        />
      </FormControl>
      </div>
        <div className={classes.xDivider}>x</div>
    
      <FormControl className={classes.margin}>
        <InputLabel
          htmlFor="weight"
          classes={{
            root: classes.cssLabel,
            focused: classes.cssFocused
          }}
        >
        lbs
        </InputLabel>
        <Input
          id="weight"
          type="number"
          autoComplete="off"
          className={classes.weightInputView}
          value={formLocation.weight}
          onChange={(e) => updateExerciseValues(exercise, set, 'weight', e.target.value)}
          classes={{
            underline: classes.cssUnderline,
          }}
        />
      </FormControl>
    </div> 
  </TableCell>
  )
}


export default withStyles(styles)(DataCellInput);
