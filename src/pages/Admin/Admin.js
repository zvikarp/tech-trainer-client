import React, { Component } from 'react';
import { Websites, Fields } from '../../components/Admin';
import axios from "axios";

import '../../utils/styles/global.css';
import './Admin.css';

class Admin extends Component {

	constructor(props) {
		super(props);
		this.state = {
			websites: [],
			fields: [],
			token: localStorage.jwtToken
		}
		this.getWebsites();
	}

	getWebsites() {
		axios.get("/api/accounts/get", { headers: { 'token': this.state.token } }).then(res => {
			var accounts = res.data;
			delete accounts._id;
			var websites = [];
			var fields = [];
			Object.keys(accounts).forEach(key => {
				var account = accounts[key];
				account.id = key;
				if (account.type === 'website') {
					websites.push(account);
				} else {
					fields.push(account);
				}
				this.setState({ websites: websites, fields: fields });
			});
		});
	}

	render() {
		return (
			<div>
				<i className="fas fa-chevron-left icon-button back-button" onClick={() => this.props.history.push('/')}></i>
				<Websites websites={this.state.websites} />
				<Fields fields={this.state.fields} />
			</div>
		);
	}

}

export default Admin