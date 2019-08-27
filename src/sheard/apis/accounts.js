import axios from "axios";

// route:  GET api/accounts/
// access: Authed
// desc:   api returns all settings
export function getAccounts() {
	return axios.get(process.env.REACT_APP_API_URL + "/accounts/").then(res => {
		return res.data;
	}).catch(err => {
		throw err.response.data;
	});
}

// route:  GET api/accounts/
// access: Authed
// desc:   api returns passing points
export function getSettingsPassing() {
	return axios.get(process.env.REACT_APP_API_URL + "/accounts/passing").then(res => {
		return res.data;
	}).catch(err => {		
		throw err.response.data;
	});
}

// route:  PUT api/accounts/
// access: Admin
// desc:   api updates the accounts
export function putAccounts(accounts) {
	return axios.put(process.env.REACT_APP_API_URL + "/accounts/accounts", { 'accounts': accounts }).then(res => {
		return res;
	}).catch(err => {
		throw err.response.data;
	});
}

// route:  PUT api/accounts/
// access: Admin
// desc:   api updates the passing points
export function putSettingsPassing(passing) {
	return axios.put(process.env.REACT_APP_API_URL + "/accounts/passing", { 'passing': passing }).then(res => {
		return res;
	}).catch(err => {
		throw err.response.data;
	});
}