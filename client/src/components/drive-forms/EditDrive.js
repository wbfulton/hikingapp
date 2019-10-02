import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDrive } from '../../actions/drive';
import EditDriveForm from './EditDriveForm';
import Spinner from '../layout/Spinner'

const EditDrive = ({
  getDrive,
  drive : { drive, loading },
  match
}) => {
  useEffect(() => {
    getDrive(match.params.id);
    // eslint-disable-next-line
  }, [getDrive]);

  // Displays Spinner if loading
  return loading || drive == null ? <Spinner /> : (
    <div className="post-form">
      <div className="bg-primary p text-center">
        <h3>Edit your Trip...</h3>
      </div>
      <EditDriveForm drive={drive}/>
    </div>
  );
};

// Defines proptypes for EditDrive component
EditDrive.propTypes = {
  getDrive: PropTypes.func.isRequired,
  drive: PropTypes.object.isRequired
};

// Sets drive prop to current drive state
const mapStateToProps = state => ({
  drive: state.drive
});

// Connects component to redux
export default connect(
  mapStateToProps,
  { getDrive }
)(withRouter(EditDrive));
