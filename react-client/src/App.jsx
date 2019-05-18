import { hot } from 'react-hot-loader';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashBoard from './components/DashBoard/DashBoard.jsx';
import axios from 'axios';
import Loading from './Loading.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuth: false,
      loading: true
    }
  }

  componentDidMount() {
    axios.get('/api/dash/isAuth')
      .then(response => {
        console.log('response in isAuthCLient', response.data)
        this.setState({
          isAuth: response.data.value,
          loading: false
        })
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
    if (this.state.loading) {
      return <Loading/>
    }
    return (
      <div>      
        <Router>
          <Route render={(props) => {
            console.log('app says', this.state.isAuth)
            return <DashBoard {...props} 
                  isAuth={this.state.isAuth}
                  setAuthFromLogIn={this.setAuthFromLogIn}  
                  setAuthFromLogOut={this.setAuthFromLogOut}    
                  />
          }}/>
          
        </Router>
      </div>
    )
  }
}

export default hot(module)(App);
