import React from 'react';
import { BrowserRouter as Switch, Route, Link, Redirect } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage.jsx';
import HomeDash from '../HomeDash/HomeDash.jsx'
import HistoryCharts from '../HistoryCharts/HistoryCharts.jsx'
import NewWorkoutTable from '../NewWorkout/NewWorkoutTable.jsx'
import TestColors from '../HistoryCharts/testcolors.jsx'

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
          <Route exact path="/" render={() => (<Redirect to="/landingPage"/>)}/>
          <Route path="/landingPage" render={(props) => <LandingPage {...props}/>}/>
          <Route path="/home" render={(props) => (
              <HomeDash 
                  {...props} 
                  userID={this.props.userID}
                  liftStateUpFromCreateNewWorkout={this.liftStateUpFromCreateNewWorkout}
              />)} 
              />
          <Route path="/historyCharts" render={(props )=> (
              <HistoryCharts 
              userID={this.props.userID}
              />
          )}/>
          <Route path="/new" render={(props)=> (
              <NewWorkoutTable 
                  details={this.state.newWorkoutProps}
              />
          )}/>

          
          <Route path="/testColors" component={TestColors} />
        
        {/* <Route path="*" render={()=>(<Redirect to="/landingPage"/>)} /> */}
        
      </div>
    )
  }
}

export default DashRouter;