import axios from "axios";

// route:  GET api/accounts/
// access: Authed
// desc:   api returns all types of accounts
export function getAccounts() {
	return axios.get(process.env.REACT_APP_API_URL + "/accounts/").then(res => {
		return res.data;
	}).catch(err => {		
		throw err.response.data;
	});
}

// route:  PUT api/accounts/
// access: Admin
// desc:   api updates the accounts info
export function putAccounts(accounts) {
	return axios.put(process.env.REACT_APP_API_URL + "/accounts/", { 'accounts': accounts }).then(res => {
		return res;
	}).catch(err => {
		throw err.response.data;
	});
}