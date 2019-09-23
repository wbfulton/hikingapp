import { GET_DRIVES, DRIVE_ERROR } from '../actions/types';

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
    case DRIVE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
