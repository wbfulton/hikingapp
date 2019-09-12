import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types';

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

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
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
      }
    default:
      return state;
  }
}