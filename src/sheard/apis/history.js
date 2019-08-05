import axios from "axios";

// route:  GET api/history/:id
// access: User/Admin
// desc:   api gets user history
export function getHistory(userId) {
	return axios.get(process.env.REACT_APP_API_URL + "/history/" + userId).then(res => {
		return res.data;
	}).catch(err => {		
		throw err.response.data;
	});
}