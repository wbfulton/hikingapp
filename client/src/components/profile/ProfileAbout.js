import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    hike,
    passes,
    user: { name }
  }
}) => (
  <div className="profile-about bg-light p-2">
    {/* Bio */}
    {bio && (
      <Fragment>
        <h2 className="text-primary">{name}'s Bio</h2>
        <p>{bio}</p>
        <div className="line"></div>
      </Fragment>
    )}
    {/* Skill Set */}
    <h2 className="text-primary">Skill Set</h2>
    <div className="skills">
      {skills.map((skill, index) => (
        <div key={index} className="p-1">
          <i className="fa fa-check"></i> {skill}
        </div>
      ))}
    </div>
    {/* Hike */}
    {hike && (
      <Fragment>
        <div className="line"></div>
        <h2 className="text-primary">Favorite Hike</h2>
        <div className="p-1">
          <i className="fas fa-mountain"></i> {hike}
        </div>
      </Fragment>
    )}
    {/* Outdoor Pass */}
    {passes && (
      <Fragment>
        <div className="line"></div>
        <h2 className="text-primary">Outdoor Pass('s)</h2>
        {passes.map((pass, index) => (
          <div key={index} className="p-1">
            <i className="far fa-address-card"></i> {pass}
          </div>
        ))}
      </Fragment>
    )}
  </div>
);

// Defines prop types for component
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
