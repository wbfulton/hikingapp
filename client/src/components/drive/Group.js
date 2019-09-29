import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getDrive } from '../../actions/drive';
import GroupItem from './GroupItem';

const Group = ({ getDrive, drive: { drive, loading }, match }) => {
  // Calls getDrive() when components is refreshed. Loads drive into state
  useEffect(() => {
    getDrive(match.params.id);
  }, [getDrive, match.params.id]);

  // Shows spinner when loading
  return loading || drive == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/drives" className="btn">
        Back To Drives
      </Link>
      <h1 className="large text-primary">Members with this Drive</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Join these members!
      </p>
      {/* Maps thorugh and Displays all group members*/}
      <div className="comments">
        {drive.group.map(member => (
          <GroupItem key={member._id} member={member} driveId={drive._id}/>
        ))}
      </div>
    </Fragment>
  );
};

// Defines proptypes for component
Group.propTypes = {
  getDrive: PropTypes.func.isRequired,
  drive: PropTypes.object.isRequired
};

// Sets drive prop to current drive state
const mapStateToProps = state => ({
  drive: state.drive
});

// Connects component with redux
export default connect(
  mapStateToProps,
  { getDrive }
)(Group);
