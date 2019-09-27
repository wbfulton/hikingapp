import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  // Redirects to dashboard if user is not logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing"> {/* Puts image on page */}
      <div className="dark-overlay"> {/* Puts shadow over page */}
        <div className="landing-inner">
          <h1 className="x-large">UW Rideshare</h1>
          <p className="lead">
            Unlimited rides to the mountain. Far out trips across the Pacific Northwest. Join the community.
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Defines prop types for component
Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

// Sets isAuthenticated prop to the current isAuthenticated state
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

// connects component to redux to access state
export default connect(mapStateToProps)(Landing);
