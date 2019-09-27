import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DriveItem from './DriveItem';
import DriveForm from './DriveForm';
import { getDrives } from '../../actions/drive';

// need to make a new reducer for drives
// need to make getDrives()
// need to bring in state of drives
const Drives = ({ getDrives, drive: { drives, loading } }) => {
  // Runs getDrives() each time page is refreshed
  useEffect(() => {
    getDrives();
  }, [getDrives]);

  // Runs Spinner when loading, else shows all Drives
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Drives</h1>
      <p className="lead">
        <i className="fas fa-car"></i> Welcome to the community!
      </p>
      <DriveForm />
      {drives.map(drive => (
        <DriveItem key={drive._id} drive={drive} />
      ))}
    </Fragment>
  );
};

// Defines props
Drives.propTypes = {
  getDrives: PropTypes.func.isRequired,
  drive: PropTypes.object.isRequired
};

// drive prop is set to the current state of drive
const mapStateToProps = state => ({
  drive: state.drive
});

// Exports Component, connect() is for redux
export default connect(
  mapStateToProps,
  { getDrives }
)(Drives);
