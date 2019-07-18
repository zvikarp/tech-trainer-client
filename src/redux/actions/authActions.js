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

export const connectCurrentUser = (userData, token) => dispatch => {
	console.log("hi");
	axios
		.get("/api/user/get", { headers: { 'token': token } })
		.then(res => {
			userData.email = res.data.user.email;
			userData.points = res.data.user.points;
			console.log("hi2");
			
			dispatch(setCurrentUser(userData));
		})
		.catch(err => {
			console.log(err);
			ToastsStore.info("⚠️ Error Signing in: " + errorToString(""));
		});
}

// Set logged in user
export const setCurrentUser = (decoded) => {
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
	localStorage.removeItem("jwtToken");
	setAuthToken(false);
	dispatch(setCurrentUser({}));
};
