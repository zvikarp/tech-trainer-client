import axios from "axios";
import setAuthToken from "../../utils/auth/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";


// async function authSignup(name, nickname, email, password) {
//   const newUserData = {
//       name: name,
//       nickname: nickname,
//       email: email,
//       password: password
//   };
//   let res = { success: false, message: "unknowen error" };
//   res = await fetch(PROXY + '/api/auth/register', {
//       method: 'post',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newUserData)
//   }).then(response => response.json()).then(data => {
//       if (data._id) {
//           res.success = true;
//           res.message = "successfuly created new account";
//           console.log(res.message + " with id: " + data._id);
//           return res;
//       }
//       else {
//           res.message = "errors creating account: " + JSON.stringify(data);
//           return res;
//       }
//   }).catch(error => {
//       res.success = false;
//       console.log(res.message + ": " + error);
//       return res;
//   });
//   return res;
// }

// Register User
export const signupNewUser = (userData, history) => dispatch => {
  axios
    .post("/api/auth/register", userData)
    .then(res => {
      console.log(res);
      signinUser(userData, history);
    }) // re-direct to login on successful register
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
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
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
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};