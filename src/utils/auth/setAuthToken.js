import axios from "axios";
import consts from "../../consts/consts";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common[consts.AUTH_HEADER] = token;
  } else {
    delete axios.defaults.headers.common[consts.AUTH_HEADER];
  }
};
export default setAuthToken;