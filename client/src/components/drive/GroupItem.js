import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Very similar to ProfileItem but different props
const GroupItem = ({
  auth,
  member: { name, avatar, phone, skills, grade, user, type },
  driveOwner
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>{type}</p>
        <p className="my-1">{grade !== '0' && <span>{grade}</span>}</p>

        <Link to={`/profile/${user}`} className="btn btn-primary">
          View Profile
        </Link>
        {/* Only shows numbers IF YOU OWN THE DRIVE. Doesn't show your own number*/}
        {!auth.loading && user !== auth.user._id && auth.user._id === driveOwner && (
          <span className="btn btn-primary my">
            {phone.substring(0, 3) + '-' + phone.substring(3, 6) + '-' + phone.substring(6)}
          </span>
        )}
      </div>
      {/* Maps thorugh skills to display all skills */}
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Defines props for component
GroupItem.propTypes = {
  member: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  driveOwner: PropTypes.object.isRequired
};

// Sets auth prop to the current auth state
const mapStateToProps = state => ({
  auth: state.auth
});

// Connects component with redux
export default connect(
  mapStateToProps,
)(GroupItem);
