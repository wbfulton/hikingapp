// imports the actions that we will be creating
import { SET_ALERT, REMOVE_ALERT } from '../actions/types.js';

// Updates State According to the Action passed in
export default function(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT: // returns current state + alert
      return [...state, payload];
    case REMOVE_ALERT: // removes specified alert
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
