import { hot } from 'react-hot-loader';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashBoard from './components/DashBoard/DashBoard.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuth: false 
    }
  }

  componentDidMount() {
    axios.get('/api/dash/isAuth')
      .then(response => {
        console.log('response in isAuthCLient', response.data)
        this.setState({isAuth: response.data.value}) 
      })
      .catch(err => console.log(err))
  }

  setAuthFromLogIn = () => {
    this.setState({isAuth: true})
  }
  setAuthFromLogOut = () => {
    this.setState({isAuth: false})
  }

  render() {
    return (
      <div>      
        <Router>
          <Route render={(props) => (
              <DashBoard {...props} 
                  isAuth={this.state.isAuth}
                  setAuthFromLogIn={this.setAuthFromLogIn}  
                  setAuthFromLogOut={this.setAuthFromLogOut}    
                  />
          )}/>
          
        </Router>
      </div>
    )
  }
}

export default hot(module)(App);
