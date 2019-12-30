import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated === true ? <Redirect to='/' /> : <Component {...props} />
    }
  />
);

export default AuthRoute;

AuthRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.object.isRequired

};
