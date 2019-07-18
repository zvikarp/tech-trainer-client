import axios from "axios";
import setAuthToken from "../../utils/auth/setAuthToken";
import jwt_decode from "jwt-decode";
import { ToastsStore } from "react-toasts";
import store from "../../redux/store";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

function errorToString(err) {
  var msg = "";
  const type = Object.prototype.toString.call(err);
  if (type === '[object Object]') {
    Object.keys(err).forEach(key => {
      msg += err[key];
      msg += ". ";
    });
  }
  if (msg === "") msg = "Unknown Error.";
  return msg;
}

// Register User
export const signupNewUser = (userData, history) => dispatch => {
  dispatch(setUserLoading(true));
  axios
    .post("/api/auth/register", userData)
    .then(res => {
      dispatch(signinUser(userData, history));
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      ToastsStore.info(
        "⚠️ Error Signing up: " + errorToString(err.response.data)
      );
      dispatch(setUserLoading(false));
    });
};

// Login - get user token
export const signinUser = (userData, history) => dispatch => {
  dispatch(setUserLoading(true));
  console.log(store.getState().auth.loading);

  axios
    .post("/api/auth/login", userData)
    .then(res => {
      try {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        console.log(token);
        dispatch(setUserLoading(false));
        history.push("/");
      } catch {
        ToastsStore.info("⚠️ Error Signing in: " + errorToString(""));
        dispatch(setUserLoading(false));
        console.log(store.getState().auth.loading);
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      ToastsStore.info(
        "⚠️ Error Signing in: " + errorToString(err.response.data)
      );
      dispatch(setUserLoading(false));
    });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = isLoading => {
  return {
    type: USER_LOADING,
    payload: isLoading
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
