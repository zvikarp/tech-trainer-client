import axios from "axios";

// route:  GET api/chart/
// access: Public
// desc:   api return the current chart
export function getChart() {
	return axios.get(process.env.REACT_APP_API_URL + "/chart/last").then(res => {
		return res;
	}).catch(err => {		
		throw err.response.data;
	});
}

// route:  PUT api/chart/last/:id
// access: User
// desc:   api updates a specific users points in last chart
export function putChart(userId) {
	return axios.put(process.env.REACT_APP_API_URL + "/chart/last/" + userId).then(res => {
		return res;
	}).catch(err => {		
		throw err.response.data;
	});
}