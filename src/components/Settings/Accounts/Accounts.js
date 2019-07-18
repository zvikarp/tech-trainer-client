import React, { Component } from 'react';
import { ToastsStore } from 'react-toasts';
import axios from "axios";

import "../../../utils/styles/global.css";
import "./Accounts.css";

class Accounts extends Component {

	constructor(props) {
		super(props);
		this.state = {
			accountsFields: {},
			accounts: {},
			token: localStorage.jwtToken
		}
		this.getAccountsTypes();
		this.getUsersAccounts();
	}

	getUsersAccounts() {
		axios.get('/api/user/accounts/get', { headers: { 'token': this.state.token } }).then(res => {
			var userAccounts = res.data;
			Object.keys(userAccounts).forEach(key => {
				this.setState({ [key]: userAccounts[key] });
				if (document.getElementById(key))
					document.getElementById(key).value = userAccounts[key];

			});
		});
	}

	getAccountsTypes() {
		axios.get("/api/accounts/get", { headers: { 'token': this.state.token } }).then(res => {
			var recivedAccounts = res.data;
			console.log(recivedAccounts);

			delete recivedAccounts._id;
			// var accounts = [];
			// Object.keys(recivedAccounts.websites).forEach(key => {
			// 	accounts.push(recivedAccounts.websites[key].name);
			// });
			// Object.keys(recivedAccounts.otherFields).forEach(key => {
			// 	accounts.push(recivedAccounts.otherFields[key]);
			// });
			this.setState({ accounts: recivedAccounts })
		});
	}


	onAccountChange = e => {
		var accountsFieldsTemp = this.state.accountsFields;
		accountsFieldsTemp[e.target.id] = e.target.value;
		this.setState({ accountsFields: accountsFieldsTemp });
	};

	onChange = e => {
		var accountsFieldsTemp = this.state.accountsFields;
		accountsFieldsTemp[e.target.id] = e.target.value;
		this.setState({ accountsFields: accountsFieldsTemp });
	};

	onSubmit = e => {
		e.preventDefault();
		axios
			.post("/api/user/accounts/update", { 'accounts': this.state.accountsFields }, {
				headers: {
					'Content-Type': 'application/json',
				}
			}).then(res => {
				if (res.data.success)
					ToastsStore.info("✔️ Your changes have been saved.");
				else
					ToastsStore.info("⚠️ Error Saving Your changes.");

			}).catch(err => {
				ToastsStore.info("⚠️ Error Saving Your changes.");
			});
	};

	renderAccountField(key, account) {
		return (
			<div key={key}>
				<div className="labeld-input">
					<label>{account.name}:</label>
					<input
						onChange={this.onAccountChange}
						value={this.state.key}
						id={key}
						type="text"
					/>
				</div>
			</div>
		);
	}

	renderAccountFields() {
		var accountsFields = [];
		Object.keys(this.state.accounts).forEach(key => {
			accountsFields.push(this.renderAccountField(key, this.state.accounts[key]));
		})
		return (accountsFields);
	}

	render() {
		return (
			<div id="accounts" >
				<h2 className="signin-title">Connected Accounts Settings</h2>
				<form noValidate onSubmit={this.onSubmit}>
					{this.renderAccountFields()}
					<div className="action-section">
						<button className="primary signin-button" type="submit">SAVE CHANGES</button>
					</div>
				</form>
			</div>
		)
	}
}

export default Accounts;