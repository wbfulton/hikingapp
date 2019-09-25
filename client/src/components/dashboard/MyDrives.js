import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DriveItem from '../drives/DriveItem';
import { getMyDrives } from '../../actions/drive';

const Drives = ({ getMyDrives, drive: { drives, loading } }) => {
  // Fetchs Posts when component renders
  useEffect(() => {
    getMyDrives();
  }, [getMyDrives]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <p className="large lead text-primary p-1">My Drives</p>
      {drives.length > 0 ? (
        <Fragment>
          <div className="posts">
            {drives.map(drive => (
              <DriveItem key={drive._id} drive={drive} />
            ))}
          </div>
        </Fragment>
      ) : (
        <p className="lead text-center p-1">
          You have not signed up for any trips yet, join the community!
        </p>
      )}
    </Fragment>
  );
};

Drives.propTypes = {
  getMyDrives: PropTypes.func.isRequired,
  drive: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  drive: state.drive
});

export default connect(
  mapStateToProps,
  { getMyDrives }
)(Drives);
