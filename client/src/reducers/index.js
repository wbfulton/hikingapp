import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

// combines and exports reducers
export default combineReducers({
  alert,
  auth
});
