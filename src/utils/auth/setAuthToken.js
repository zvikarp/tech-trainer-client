import axios from "axios";
import consts from "../../consts/general";

const setAuthToken = (token) => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common[consts.AUTH_HEADER] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common[consts.AUTH_HEADER];
  }
};
export default setAuthToken;