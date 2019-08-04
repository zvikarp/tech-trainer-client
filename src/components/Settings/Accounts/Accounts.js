import React, { Component } from 'react';
import { ToastsStore } from 'react-toasts';
import axios from "axios";
import ReactTooltip from 'react-tooltip'

import messages from "../../../consts/messages";
import store from "../../../redux/store";


import "../../../utils/styles/global.css";
import "./Accounts.css";

class Accounts extends Component {

	constructor(props) {
		super(props);
		var userId;
		if (this.props.ofUser) {
			userId = this.props.ofUser.userId;
		} else {
			userId = store.getState().auth.user.id
		}
		this.state = {
			accountsFields: {},
			accounts: {},
			token: localStorage.jwtToken,
			loading: false,
			userId: userId,
		}
	}

	componentDidMount() {
		this.getAccountsTypes();
		this.getUsersAccounts();
	}

	errorToString(err) {
		var msg = " " + err.join(", ");
		return msg;
	}

	getUsersAccounts() {
		axios.get(process.env.REACT_APP_API_URL + "/user/accounts/" + this.state.userId, { headers: { 'token': this.state.token } }).then(res => {
			var userAccounts = res.data;
			Object.keys(userAccounts).forEach(key => {
				this.setState({ [key]: userAccounts[key] });
				if (document.getElementById(key))
					document.getElementById(key).value = userAccounts[key];

			});
		});
	}

	getAccountsTypes() {
		axios.get(process.env.REACT_APP_API_URL + "/accounts/", { headers: { 'token': this.state.token } }).then(res => {
			var recivedAccounts = res.data;
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
		this.setState({ loading: true });
		axios.put(process.env.REACT_APP_API_URL + "/user/accounts/" + this.state.userId, { 'accounts': this.state.accountsFields }, {
			headers: { 'Content-Type': 'application/json' }
		}).then(res => {
			if (res.data.success) {
				ToastsStore.info(messages.SUCCESS_SAVING_CHANGES);
				ToastsStore.info(messages.UPDATING_CHART);
				axios.post(process.env.REACT_APP_API_URL + "/cronjob/updateuserspoints/" + this.state.userId, { 'accounts': this.state.accountsFields }).then(res => {
					ToastsStore.info(messages.SUCCESS_UPDATING_CHART);
				}).catch(err => {
					ToastsStore.info(messages.ERROR_UPDATING_CHART);
				});
			}
			else
				ToastsStore.info(messages.KNOWN_ERROR_PREFIX + this.errorToString(res.data.messages));
			this.setState({ loading: false });
		}).catch(err => {
			console.log(err.response.data);
			
			ToastsStore.info(messages.KNOWN_ERROR_PREFIX + this.errorToString(err.response.data.messages));
			this.setState({ loading: false });
		});
	};

	renderSaveButton() {
		if (this.state.loading) {
			return (
				<button disabled className="signin-button">
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