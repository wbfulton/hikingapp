import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


// If not authenticated, redirects to login page
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

// Defineds prop types for component
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

// Sets auth prop to current auth state
const mapStateToProps = state => ({
  auth: state.auth
});

// Connects component with redux
export default connect(mapStateToProps)(PrivateRoute);
