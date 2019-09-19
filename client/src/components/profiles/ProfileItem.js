import React from 'react';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar, messenger },
    type,
    grade,
    skills,
    driver
  }
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p className="lead">{driver && <i className="fas fa-check"> Driver</i>}</p>
        <p>{type}</p>
        <p className="my-1">{grade !== '0' && <span>{grade}</span>}</p>
        
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
        <a href={`https://${messenger}`} className="btn btn-primary">
            Message
        </a>
      </div>
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

export default (ProfileItem);
