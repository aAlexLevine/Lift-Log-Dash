import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({component: Component, isAuth, ...rest}) => (
  <Route
    {...rest}
    render={(props) => (
      isAuth 
        ? <Component {...props} {...rest} isAuth={isAuth} />
        : <Redirect to="/landingPage/"/>
    )}/>
)

export default AuthRoute;