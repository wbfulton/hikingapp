import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  match,
  auth
}) => {
  // Gets profile each time page loads
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  // Shows Spinner when loading
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Members
          </Link>
          {/* Edit Button only shows for a Users own profile */}
          {auth.loading === false && auth.user._id === profile.user._id && (
            <Link to="/edit-profile" className="btn btn-dark">
              Edit Profile
            </Link>
          )}
          {/* Shows Profile Top */}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
          </div>
          {/* Shows Profile About Section */}
          <div className="profile-about my-1">
            <ProfileAbout profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

// Defines props for component
Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

// Sets profile and auth props to their current respective states
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

// Connects component to redux
export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
