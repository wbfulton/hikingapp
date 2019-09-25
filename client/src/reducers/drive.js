import {
  GET_DRIVES,
  DRIVE_ERROR,
  DELETE_DRIVE,
  ADD_DRIVE
} from '../actions/types';

const initialState = {
  drives: [],
  drive: null,
  loading: true,
  error: {}
};

// Updates State based on Action Called
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DRIVES:
      return {
        ...state,
        drives: payload,
        loading: false
      };
    // Newly created post is shown first until refresh
    case ADD_DRIVE:
      return {
        ...state,
        drives: [payload, ...state.drives],
        loading: false
      };
    case DRIVE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case DELETE_DRIVE:
      return {
        ...state,
        drives: state.drives.filter(drive => drive._id !== payload),
        loading: false
      };
    default:
      return state;
  }
}
