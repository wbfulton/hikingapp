import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DriveItem from './DriveItem';
import { getDrives } from '../../actions/drive';

// need to make a new reducer for drives
// need to make getDrives()
// need to bring in state of drives
const Drives = ({ getDrives, drive: { drives, loading } }) => {
  useEffect(() => {
    getDrives();
  }, [getDrives]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 class="large text-primary">Drives</h1>
      <p class="lead">
        <i class="fas fa-car"></i> Welcome to the community!
      </p>
      {drives.map(drive => (
        <DriveItem key={drive._id} drive={drive} />
      ))}
    </Fragment>
  );
};

Drives.propTypes = {
  getDrives: PropTypes.func.isRequired,
  drive: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  drive: state.drive
});

export default connect(
  mapStateToProps,
  { getDrives }
)(Drives);
