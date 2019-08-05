import axios from "axios";

// TODO: rename from cronjob...

// route:  POST api/cronjob/updateuserpoints/:id
// access: User
// desc:   api re-calcs the top chart by just calculating one user
export function updateUserCronjob(userId) {
	return axios.get(process.env.REACT_APP_API_URL + "/cronjob/updateuserspoints/" + userId).then(res => {
		return res;
	}).catch(err => {		
		throw new Error(err);
	});
}