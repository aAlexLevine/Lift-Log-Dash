import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class TimerInterface extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      anchorEl: null,
    }
  }

  render() {
    return (
      <div>
  
        <Menu
          id="simple-menu"
          anchorEl={this.props.anchorEl}
          open={Boolean(this.props.anchorEl)}
          onClose={this.props.handleMenuClose}
        >
          <MenuItem onClick={this.props.handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={this.props.handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={this.props.handleMenuClose}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default TimerInterface;