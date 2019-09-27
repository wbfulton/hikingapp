import {
  GET_DRIVES,
  DRIVE_ERROR,
  DELETE_DRIVE,
  ADD_DRIVE,
  UPDATE_GROUP
} from '../actions/types';

// Initializes the State for drives
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
    // Puts Drives into UI
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
    // Throws Error to UI
    case DRIVE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    // Deletes Drive From UI
    case DELETE_DRIVE:
      return {
        ...state,
        drives: state.drives.filter(drive => drive._id !== payload),
        loading: false
      };
    // Updates Group In UI
    case UPDATE_GROUP:
      return {
        ...state,
        drives: state.drives.map(drive =>
          drive._id === payload.driveId
            ? { ...drive, group: payload.group, seats: payload.join ? drive.seats - 1 : drive.seats + 1}
            : drive
        ),
        loading: false
      };
    default:
      return state;
  }
}
