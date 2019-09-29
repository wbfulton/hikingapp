import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Very similar to ProfileItem but different props
const GroupItem = ({
  auth,
  member: { name, avatar, messenger, skills, grade, user, type }
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
        {/* Only shows message for users not yourself */}
        {!auth.loading && user !== auth.user._id && (
          <a href={`https://${messenger}`} className="btn btn-primary">
            Message
          </a>
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
  auth: PropTypes.object.isRequired
};

// Sets auth prop to the current auth state
const mapStateToProps = state => ({
  auth: state.auth
});

// Connects component with redux
export default connect(
  mapStateToProps,
)(GroupItem);
