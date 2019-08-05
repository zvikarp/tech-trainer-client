import axios from "axios";

// route:  GET api/chart/
// access: Public
// desc:   api return the current chart
export function getChart() {
	return axios.get(process.env.REACT_APP_API_URL + "/chart/").then(res => {
		return res;
	}).catch(err => {		
		throw err.response.data;
	});
}