import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  // Calls getProfiles() every component refresh
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  // Shows spinner when loading
  return <Fragment>
      { loading ? 
        <Spinner /> : <Fragment>
          <h1 className="large text-primary">Members</h1>
          <p className="lead">
            <i className="far fa-address-book"></i> Connect with fellow skiers!
          </p>
          <div className="profiles">
             { profiles.length > 0 ? (
                 profiles.map(profile => (
                     <ProfileItem key={profile._id} profile={profile} />
                 ))
             ) : <h4>No profiles found...</h4>} 
          </div>
        </Fragment> }
    </Fragment>
};

// Defines prop types for component
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

// Sets profile prop to current profile state
const mapStateToProps = state => ({
  profile: state.profile
});

// Connects component to redux
export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
