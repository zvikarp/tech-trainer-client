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