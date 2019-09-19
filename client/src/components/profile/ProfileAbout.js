import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    resort,
    pass,
    user: { name }
  }
}) => (
  <div className="profile-about bg-light p-2">
    {bio && (
      <Fragment>
        <h2 className="text-primary">{name}'s Bio</h2>
        <p>{bio}</p>
        <div className="line"></div>
      </Fragment>
    )}
    <h2 className="text-primary">Skill Set</h2>
    <div className="skills">
      {skills.map((skill, index) => (
        <div key="index" className="p-1">
          <i className="fa fa-check"></i> {skill}
        </div>
      ))}
    </div>
    {resort && (
      <Fragment>
        <div className="line"></div>
        <h2 className="text-primary">Favorite Resort</h2>
        <div className="p-1">
          <i className="fas fa-mountain"></i> {resort}
        </div>
      </Fragment>
    )}
    {pass && (
      <Fragment>
        <div className="line"></div>
        <h2 className="text-primary">Ski Pass</h2>
        <div className="p-1">
          <i className="far fa-address-card"></i> {pass}
        </div>
      </Fragment>
    )}
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
