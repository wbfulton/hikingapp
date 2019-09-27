import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_DRIVES,
  DRIVE_ERROR,
  DELETE_DRIVE,
  ADD_DRIVE,
  UPDATE_GROUP
} from './types';

// Gets All Open and Valid Drives
export const getDrives = () => async dispatch => {
  try {
    const res = await axios.get('/api/drives');

    dispatch({
      type: GET_DRIVES,
      payload: res.data
    });
  } catch (err) {
    // If error, sends a DRIVE_ERROR action and msg with status code
    dispatch({
      type: DRIVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Gets all Drives a User has signed up for / made
export const getMyDrives = () => async dispatch => {
  try {
    const res = await axios.get('/api/drives/dashboard/me');

    dispatch({
      type: GET_DRIVES,
      payload: res.data
    });
  } catch (err) {
    // If error, sends a DRIVE_ERROR action and msg with status code
    dispatch({
      type: DRIVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Deletes a drive, Shows banner for result
export const deleteDrive = id => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`/api/drives/${id}`);

      // Payload is id, we can remove the drive immediately in front-end
      dispatch({
        type: DELETE_DRIVE,
        payload: id
      });

      dispatch(setAlert('Drive Removed', 'success'));
    } catch (err) {
      // If error, sends a DRIVE_ERROR action and msg with status code
      dispatch({
        type: DRIVE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Adds a drive. Input date must be correct format and a future date. Shows banner for result
export const addDrive = formData => async dispatch => {
  const config = {
    'Content-Type': 'application.json'
  };
  try {
    const res = await axios.post('/api/drives', formData, config);

    dispatch({
      type: ADD_DRIVE,
      payload: res.data
    });

    dispatch(setAlert('Drive Created', 'success'));
  } catch (err) {
    // Creates alerts for missing required fields
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }

    // If error, sends a DRIVE_ERROR action and msg with status code
    dispatch({
      type: DRIVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Adds a user to a group. Updates UI immediately. Shows banner for result
export const joinGroup = driveId => async dispatch => {
  try {
    const res = await axios.put(`/api/drives/join/${driveId}`);

    dispatch({
      type: UPDATE_GROUP,
      payload: {
        driveId,
        group: res.data
      }
    });

    dispatch(setAlert('Drive Joined', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));
    // If error, sends a DRIVE_ERROR action and msg with status code
    dispatch({
      type: DRIVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Removes a user from a group. Updates UI immediately. Shows banner for result
export const leaveGroup = driveId => async dispatch => {
  try {
    const res = await axios.put(`/api/drives/leave/${driveId}`);

    dispatch({
      type: UPDATE_GROUP,
      payload: {
        driveId,
        group: res.data
      }
    });

    dispatch(setAlert('Drive Left', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));
    // If error, sends a DRIVE_ERROR action and msg with status code
    dispatch({
      type: DRIVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
