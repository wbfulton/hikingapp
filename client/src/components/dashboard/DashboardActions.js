import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/drives" className="btn btn-light">
        <i className="fas fa-car text-primary"></i> Join a Drive
      </Link>
      <Link to="/posts" className="btn btn-light">
        <i className="fas fa-comment text-primary"></i> Make a Post
      </Link>
    </div>
  );
};

export default DashboardActions;
