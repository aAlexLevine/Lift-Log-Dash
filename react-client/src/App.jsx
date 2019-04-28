import { hot } from 'react-hot-loader';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavBar from './components/NavBar/NavBar.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import DashBoard from './components/DashBoard/DashBoard.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  render() {
    return (
      <div>      
        <Router>
          <Route render={(props) => <DashBoard {...props} isLoggedIn={this.state.isLoggedIn}/>} />
        </Router>
      </div>
    )
  }
}

export default hot(module)(App);

