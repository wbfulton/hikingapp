import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DriveItem from '../drives/DriveItem';
import CommentForm from './CommentForm';
import CommentItem from '../drive/CommentItem';
import { getDrive } from '../../actions/drive';

const Drive = ({ getDrive, drive: { drive, loading }, match }) => {
  // Calls getDrive() once every page refresh
  useEffect(() => {
    getDrive(match.params.id);
  }, [getDrive, match.params.id]);

  // Shows Spinner when loading
  return loading || drive == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/drives" className="btn">
        Back To Drives
      </Link>
      {/* Drive and Comment Form */}
      <DriveItem drive={drive} showActions={false} />
      <CommentForm driveId={drive._id} />
      {/* Shows All Comments */}
      <div className="comments">
        {drive.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} driveId={drive._id} />
        ))}
      </div>
    </Fragment>
  );
};

// Defines proptypes for Drive component
Drive.propTypes = {
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
)(Drive);