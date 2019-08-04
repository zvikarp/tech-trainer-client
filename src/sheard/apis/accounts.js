import axios from "axios";

export function getAccounts() {
	return axios.get(process.env.REACT_APP_API_URL + "/accounts/").then(res => {
		return res.data;
	}).catch(err => {		
		return err;
	});
}