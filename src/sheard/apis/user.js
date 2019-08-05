import axios from "axios";

// route:  GET api/user/:id
// access: User/Admin
// desc:   api return current user detailes
export function getUser(userId) {
	return axios.get(process.env.REACT_APP_API_URL + "/user/" + userId).then(res => {
		return res.data;
	}).catch(err => {		
		return err;
	});
}

// route:  GET api/user/accounts/:id
// access: User/Admin
// desc:   api gets the users connected accounts.
export function getUserAccounts(userId) {
	return axios.get(process.env.REACT_APP_API_URL + "/user/accounts/" + userId).then(res => {
		return res.data;
	}).catch(err => {		
		return err;
	});
}

// route:  PUT api/user/accounts/:id
// access: User/Admin
// desc:   api updates the users connected accounts.
export function putUserAccounts(userId, accounts) {
	return axios.put(process.env.REACT_APP_API_URL + "/user/accounts/" + userId, { accounts }).then(res => {
		return res;
	}).catch(err => {
		return err;
	});
}

// route:  PUT api/user/settings/:id
// access: User/Admin
// desc:   api updates the users settings.
export function putUserSettings(userId, name, email, bonusPoints) {
	return axios.put(process.env.REACT_APP_API_URL + "/user/settings/" + userId, { name, email, bonusPoints }).then(res => {
		return res;
	}).catch(err => {
		return err;
	});
}

// route:  GET api/user/admin/:id
// access: Auth
// desc:   api return if current user is admin or not
export function checkIfAdmin(userId) {
	return axios.get(process.env.REACT_APP_API_URL + "/user/admin/" + userId).then(res => {
		return res;
	}).catch(err => {		
		return err;
	});
}