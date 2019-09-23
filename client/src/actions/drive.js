import axios from 'axios';
import { setAlert } from './alert';
import { GET_DRIVES, DRIVE_ERROR } from './types';

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
}