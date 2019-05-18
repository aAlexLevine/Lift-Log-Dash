import React from 'react';
import { BrowserRouter as Switch, Route, Link, Redirect } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage.jsx';
import HomeDash from '../HomeDash/HomeDash.jsx'
import HistoryCharts from '../HistoryCharts/HistoryCharts.jsx'
import NewWorkoutTable from '../NewWorkout/NewWorkoutTable.jsx'
import TestColors from '../HistoryCharts/testcolors.jsx'
import AuthRoute from './AuthRoute.jsx';
import AddPlans from '../AddPlans/AddPlans.jsx'
import TableContainer from '../NewWorkout/TableContainer.jsx';
// import Loading from './Loading.jsx'

class DashRouter extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        newWorkoutProps: {}
      }
  }

  liftStateUpFromCreateNewWorkout = (data) => {
    this.setState({newWorkoutProps: data})
  }

  render() {
    return ( 
      <div>
          <Route 
              exact path="/" 
              render={() => {
                console.log('router says', this.props.isAuth)
                return (
                  this.props.isAuth 
                    ? <Redirect to='/home' />
                    : <Redirect to="/landingPage"/>
                )
              }}
          />
           {/* <Route 
              path="/loading" 
              render={(props) => <Loading {...props} 
                // setAuthFromLogIn={this.props.setAuthFromLogIn}
                isAuth={this.props.isAuth}
                />}
          /> */}
          <Route 
              path="/landingPage" 
              render={(props) => <LandingPage {...props} 
                setAuthFromLogIn={this.props.setAuthFromLogIn}
                isAuth={this.props.isAuth}
                />}
          />
          <AuthRoute 
              path="/home" 
              component={HomeDash} 
              // userID={this.props.userID}
              liftStateUpFromCreateNewWorkout={this.liftStateUpFromCreateNewWorkout}
              isAuth={this.props.isAuth}
          />
          <AuthRoute 
              path="/historyCharts" 
              component={HistoryCharts} 
              // userID={this.props.userID}
              isAuth={this.props.isAuth}
          />
  
          <AuthRoute 
              path="/new" 
              // component={NewWorkoutTable} 
              component={TableContainer}
              details={this.state.newWorkoutProps}
              isAuth={this.props.isAuth}
          />

          <AuthRoute 
              path="/addPlans" 
              component={AddPlans} 
              isAuth={this.props.isAuth}
          />

          
          <Route path="/testColors" component={TestColors} />
        
        {/* <Route path="*" render={()=>(<Redirect to="/"/>)} /> */}
        
      </div>
    )
  }
}

export default DashRouter;