import axios from "axios";

// route:  GET api/accounts/
// access: Authed
// desc:   api returns all types of accounts
export function authSignin(credentials) {
	return axios.post(process.env.REACT_APP_API_URL + "/auth/login", credentials).then(res => {
		return res.data;
	}).catch(err => {		
		throw err.response.data;
	});
}