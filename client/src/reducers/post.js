import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

// Updates State According to the Action passed in
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Loads posts into UI
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    // Loads post in UI
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    // Adds post in UI
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    // Immediately removes post from UI
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    // Sends Error to UI
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    // Updates like array for specfic post
    // Updates by mapping through posts until id's match and it updates likes
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    // Adds comments for a specfic post
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
      };
    // Removes comments for a specfic post
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}
