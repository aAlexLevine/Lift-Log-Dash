import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = (theme) => ({
  maxLiftRadio: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  avgLiftRadio: {
    color: theme.palette.primary.main,
    '&$checked': {
      color: theme.palette.primary.main,
    },
  },
  checked: {},
  formControl: {
    margin: theme.spacing.unit * 3,
    // display: 'flex'
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    // display: 'flex'
  },
  radiosContainer: {
    // display: 'flex'
  }
});

class ChartControls extends React.Component {
  state = {
    value: 'maxLiftsData',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.setDataType(event. target.value)
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
      <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel focused={false} component="legend">Data Type</FormLabel>
      {/* <div> */}
      <RadioGroup row
        aria-label="Data Type"
        name="Data Type"
        className={classes.group}
        value={this.state.value}
        onChange={this.handleChange}
      >
      {/* <div className={classes.radiosContainer}> */}
        <FormControlLabel
          value="maxLiftsData"
          control={
            <Radio color="primary" 
            classes={{
              root: classes.avgLiftRadio,
              checked: classes.checked}} 
            />}
          label="Max lift"
          labelPlacement="end"
        />
        <FormControlLabel
          value="averageRepLiftsData"
          control={
            <Radio classes={{
              root: classes.maxLiftRadio,
              checked: classes.checked}} 
              />
            }
          label="Average Rep"
          labelPlacement="end"
        />
        {/* </div> */}
      </RadioGroup>
      <FormHelperText>labelPlacement start</FormHelperText>
    </FormControl>
      </div>
    );
  }
}



export default withStyles(styles)(ChartControls);