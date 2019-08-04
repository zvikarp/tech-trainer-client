import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastsStore } from "react-toasts";

import messages from "../../consts/messages"
import setAuthToken from "../../utils/auth/setAuthToken";
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
export const SignupNewUser = (userData, history) => dispatch => {
	dispatch(SetUserLoading(true));
	axios
		.post(process.env.REACT_APP_API_URL + "/auth/register", userData)
		.then(res => {
			dispatch(SigninUser(userData, history));
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
			ToastsStore.info(
				messages.KNOWN_ERROR_PREFIX + errorToString(err.response.data)
			);
			dispatch(SetUserLoading(false));
		});
};

// Login - get user token
export const SigninUser = (userData, history) => dispatch => {
	dispatch(SetUserLoading(true));
	axios
		.post(process.env.REACT_APP_API_URL + "/auth/login", userData)
		.then(res => {
			try {
				const { token } = res.data;
				localStorage.setItem("jwtToken", token);
				setAuthToken(token);
				const decoded = jwt_decode(token);
				dispatch(SetCurrentUser(decoded));
			} catch {
				ToastsStore.info(messages.KNOWN_ERROR_PREFIX + errorToString(""));
				dispatch(SetUserLoading(false));
			}
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
			ToastsStore.info(
				messages.KNOWN_ERROR_PREFIX + errorToString(err.response.data)
			);
			dispatch(SetUserLoading(false));
		});
};

// Set logged in user
export const SetCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

// User loading
export const SetUserLoading = isLoading => {
	return {
		type: USER_LOADING,
		payload: isLoading
	};
};

// Log user out
export const LogoutUser = () => dispatch => {
	localStorage.removeItem("jwtToken");
	setAuthToken(false);
	dispatch(SetCurrentUser({}));
};
