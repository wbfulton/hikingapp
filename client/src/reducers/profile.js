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
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
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
