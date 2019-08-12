import axios from "axios";

// route:  GET api/accounts/
// access: Authed
// desc:   api returns all types of accounts
export function authSignin(credentials) {
	return axios.post(process.env.REACT_APP_API_URL + "/auth/signin", credentials).then(res => {
		return res.data;
	}).catch(err => {
		throw err.response.data;
	});
}

export function authSignup(credentials) {
	return axios.post(process.env.REACT_APP_API_URL + "/auth/signup", credentials).then(res => {
		return res.data;
	}).catch(err => {
		throw err.response.data;
	});
}