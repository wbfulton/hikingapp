import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_DRIVES,
  GET_DRIVE,
  DRIVE_ERROR,
  DELETE_DRIVE,
  ADD_DRIVE,
  UPDATE_GROUP,
  ADD_COMMENT,
  REMOVE_COMMENT
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

// Gets a Drive By ID
export const getDrive = id => async dispatch => {
  try {
    const res = await axios.get(`/api/drives/${id}`);

    dispatch({
      type: GET_DRIVE,
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

// Edits a drive. Input date must be correct format and a future date. Shows banner for result
export const editDrive = (id, formData, history) => async dispatch => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put(`/api/drives/${id}`, formData, config);

    dispatch({
      type: GET_DRIVE,
      payload: res.data
    });

    dispatch(setAlert('Drive Edited', 'success'));

    // Redirect to dashboard after making or editing profile
    history.push('/dashboard');

  } catch (err) {
    // Creates alerts for missing required fields
    const errors = err.response.data.errors;
    console.log(err);
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    // If error, sends a DRIVE_ERROR action and msg with status code
    dispatch({
      type: DRIVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    //dispatch(setAlert(errors, 'danger'))
  }
};

// Adds a drive. Input date must be correct format and a future date. Shows banner for result
export const addDrive = formData => async dispatch => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };

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
        group: res.data,
        join: true
      }
    });

    dispatch(setAlert('Drive Joined', 'success'));
  } catch (err) {
    // @toDo find a way to seperate errors
    if (err.response.status === 400) {
      dispatch(
        setAlert(
          'You need a profile to join drives. If you have a profile, refresh page and try again',
          'danger'
        )
      );
    } else {
      dispatch(setAlert(err.response.statusText, 'danger'));
    }

    // If error, sends a DRIVE_ERROR action and msg with status code
    dispatch({
      type: DRIVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Removes a user from a group. Updates UI immediately. Shows banner for result
export const leaveGroup = driveId => async dispatch => {
  if (window.confirm('Are you sure?')) {
    try {
      const res = await axios.put(`/api/drives/leave/${driveId}`);

      dispatch({
        type: UPDATE_GROUP,
        payload: {
          driveId,
          group: res.data,
          join: false
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
  }
};

// Add Comment, Shows banner
export const addComment = (driveId, formData) => async dispatch => {
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/drives/comment/${driveId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    // If error, sends a DRIVE_ERROR action and msg with status code
    dispatch({
      type: DRIVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Comment, Shows banner
export const deleteComment = (driveId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/drives/comment/${driveId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    // If error, sends a DRIVE_ERROR action and msg with status code
    dispatch({
      type: DRIVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
