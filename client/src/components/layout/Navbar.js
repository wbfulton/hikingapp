import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  // Links to display for signed in users
  const authLinks = (
    <ul>
      <li>
        <Link to="/drives">Drives</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/profiles">Members</Link>
      </li>
      <li>
        |
        <Link to="/dashboard" title="Dashboard">
          <i className="fas fa-user"></i>
          <span className="hide-sm"> Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} title="Logout">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm"> Logout</span>
        </a>
      </li>
    </ul>
  );

  // links to show for guest users
  const guestLinks = (
    <ul>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/officers">Officers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Sign In</Link>
      </li>
    </ul>
  );

  // displays navbar is page is not loading
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-skiing"></i> Husky Snow Club
        </Link>
      </h1>
      { !loading && (<Fragment>{ isAuthenticated ? authLinks: guestLinks }</Fragment>) }
    </nav>
  );
};

// Sets what our props are and what type they are
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

// Gets current state of auth
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
