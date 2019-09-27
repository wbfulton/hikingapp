import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE
} from '../actions/types';

// profile for a single users profile,
// profiles for listing page
// posts and drives for dashboard
const initialState = {
  profile: null,
  profiles: [],
  drives: [],
  posts: [],
  loading: true,
  error: {}
};

// Updates State According to the Action passed in
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Loads profile into UI
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    // Loads profiles into UI
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    // Sends UI error message
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    // Clears profiles and state
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        drives: [],
        posts: [],
        loading: false
      };
    default:
      return state;
  }
}
