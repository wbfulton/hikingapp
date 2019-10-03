import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    grade,
    type,
    exp,
    driver,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <div className="profile-top bg-primary p-2 text-center">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      {/* Driver only shows if they are a driver */}
      <p className="lead">
        {driver && <i className="fas fa-check"> Driver</i>}
      </p>
      <p className="lead">{type}</p>
      {/* Only shows if they put it in profile */}
      <p className="lead">{grade !== '0' && <span>{grade}</span>}</p>
      {/* Only shows if they put it in profile */}
      <p className="lead">{exp !== '0' && <span>{exp}</span>}</p>
      {/* Shows all social media links inputed */}
      <div className="icons my-1">
        {social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
};

// Defines props for component
ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
