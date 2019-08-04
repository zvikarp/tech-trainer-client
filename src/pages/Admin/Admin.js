import React, { Component } from 'react';
import { ToastsStore } from 'react-toasts';

import messages from "../../consts/messages"
import { AllAccounts } from "../../components/Admin";
import { getAccounts } from "../../sheard/apis/accounts";

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
	}

	componentDidMount() {
		this.getWebsites();
	}

	async getWebsites() {
		try {
			const accounts = await getAccounts()
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
		} catch (err) {
			ToastsStore.info(messages.ERROR_LOADING_DATA);
		}
	}

	render() {
		return (
			<div>
				<button className="primary back-button" onClick={() => this.props.history.push("/")}>
					<i className="fas fa-chevron-left" />
					<div className="button-text">BACK</div>
				</button>
				<AllAccounts websites={this.state.websites} />
			</div>
		);
	}

}

export default Admin