import axios from 'axios';
import { setAlert } from './alert';
import { GET_DRIVES, DRIVE_ERROR, DELETE_DRIVE, ADD_DRIVE } from './types';

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

export const deleteDrive = id => async dispatch => {
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
};

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
