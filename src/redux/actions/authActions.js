import axios from "axios";
import setAuthToken from "../../utils/auth/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";


// Register User
export const signupNewUser = (userData, history) => dispatch => {
  axios
    .post("/api/auth/register", userData)
    .then(res => {
      console.log(res);
      signinUser(userData, history);
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};

// Login - get user token
export const signinUser = (userData, history) => dispatch => {
  axios
    .post("/api/auth/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      console.log(token);
      history.push("/")
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  console.log(decoded);
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  console.log("0");
  localStorage.removeItem("jwtToken");
  console.log("1");
  
  setAuthToken(false);
  console.log("2");
  dispatch(setCurrentUser({}));
  console.log("3");
  console.log("4");
};