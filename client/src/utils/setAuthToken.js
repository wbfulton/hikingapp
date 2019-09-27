import axios from 'axios';

// Takes in token
// If it exists, adds it to headers.
// If not, deletes it from headers
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
