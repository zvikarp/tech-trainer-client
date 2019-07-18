import React, { Component } from 'react';
import { ToastsStore } from 'react-toasts';
import axios from "axios";
import ReactTooltip from 'react-tooltip'


import "../../../utils/styles/global.css";
import "./Accounts.css";

class Accounts extends Component {

	constructor(props) {
		super(props);
		this.state = {
			accountsFields: {},
			accounts: {},
			token: localStorage.jwtToken,
			loading: false,
		}
		this.getAccountsTypes();
		this.getUsersAccounts();
	}

	errorToString(err) {
		var msg = "";
		const type = Object.prototype.toString.call(err);
		if (type === '[object Object]') {
			Object.keys(err).forEach(key => {
				msg += err[key];
				msg += ". ";
			});
		}
		if (msg === "") msg = "Unknown Error.";
		return msg;
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
		this.setState({loading: true});
		axios
			.post("/api/user/accounts/update", { 'accounts': this.state.accountsFields }, {
				headers: {
					'Content-Type': 'application/json',
				}
			}).then(res => {
				if (res.data.success)
					ToastsStore.info("✔️ Your changes have been saved.");
				else
					ToastsStore.info("⚠️ Error: " + this.errorToString(res.data.message));
					this.setState({loading: false});
			}).catch(err => {
				ToastsStore.info("⚠️ Error Saving Your changes.");
				this.setState({loading: false});
			});
	};

	renderSaveButton() {
		if (this.state.loading) {
			return (
				<button disabled className="signin-button disabled">
					WORKING ON IT...
        </button>
			);
		} else {
			return (
				<button className="primary signin-button" type="submit">
					SAVE CHANGES
        </button>
			);
		}
	}

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
					<i data-tip={account.instructions} className="fas fa-info-circle tooltip-button"></i>
					<ReactTooltip />
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
						{this.renderSaveButton()}
					</div>
				</form>
			</div>
		)
	}
}

export default Accounts;