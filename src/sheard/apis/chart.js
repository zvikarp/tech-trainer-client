import axios from "axios";

// route:  GET api/chart/last
// access: Public
// desc:   api return the last chart
export function getLastChart() {
	return axios.get(process.env.REACT_APP_API_URL + "/chart/last").then(res => {
		return res;
	}).catch(err => {		
		throw err.response.data;
	});
}

// route:  GET api/chart/
// access: Public
// desc:   api return all charts (last 25)
export function getCharts() {
	return axios.get(process.env.REACT_APP_API_URL + "/chart/").then(res => {
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