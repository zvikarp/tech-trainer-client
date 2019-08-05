import React, { Component } from 'react';
import { ToastsStore } from 'react-toasts';
import ReactTooltip from 'react-tooltip'

import messages from "../../../consts/messages";
import store from "../../../redux/store";
import { OButton } from "../../core";
import { getAccounts } from "../../../sheard/apis/accounts";
import { updateUserCronjob } from "../../../sheard/apis/cronjob";
import { getUserAccounts, putUserAccounts } from "../../../sheard/apis/user";


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

	async getUsersAccounts() {
		try {
			const userAccounts = await getUserAccounts(this.state.userId);
			Object.keys(userAccounts).forEach(key => {
				this.setState({ [key]: userAccounts[key] }); // TODO: is this really a good idea?
				if (document.getElementById(key))
					document.getElementById(key).value = userAccounts[key];
			});
		} catch (err) {
			ToastsStore.info(messages.ERROR_LOADING_DATA);
		}
	}

	async getAccountsTypes() {
		try {
			const accounts = await getAccounts();
			this.setState({ accounts });
		} catch (err) {
			ToastsStore.info(messages.ERROR_LOADING_DATA);
		}
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

	onSubmit = async (e) => {
		e.preventDefault();
		this.setState({ loading: true });
		try {
			await putUserAccounts(this.state.userId, this.state.accountsFields);
			ToastsStore.info(messages.SUCCESS_SAVING_CHANGES);
			ToastsStore.info(messages.UPDATING_CHART);
			await updateUserCronjob(this.state.userId);
			ToastsStore.info(messages.SUCCESS_UPDATING_CHART);
		} catch (err) { // TODO: needs better error handeling
			ToastsStore.info(messages.ERROR_UPDATING_CHART);
			// ToastsStore.info(messages.KNOWN_ERROR_PREFIX + this.errorToString(err.data.messages));
		} finally {
			this.setState({ loading: false });
		}
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
					<i data-tip={account.instructions} className="fas fa-info-circle tooltip-button"></i>
					<ReactTooltip />
				</div>
			</div>
		);
	}

	renderAccountFields() {
		var accountsFields = [];
		Object.keys(this.state.accounts).forEach(key => {
			console.log(key);

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
						<OButton
							loading={this.state.loading}
							submit
							type="primary signin-button"
							text="SAVE CHANGES"
						/>
					</div>
				</form>
			</div>
		)
	}
}

export default Accounts;