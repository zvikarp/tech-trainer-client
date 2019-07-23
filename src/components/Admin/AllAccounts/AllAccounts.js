import React, { Component } from 'react';
import { AccountCard } from '../';
import axios from "axios";
import { ToastsStore } from 'react-toasts';

import "../../../utils/styles/global.css";
import "./AllAccounts.css";

class AllAccounts extends Component {

	constructor(props) {
		super(props);
		this.handleOnAccountChange = this.handleOnAccountChange.bind(this);
		this.handleOnAccountDelete = this.handleOnAccountDelete.bind(this);
		this.handleOnAddAccount = this.handleOnAddAccount.bind(this);
		this.handleOnSaveChanges = this.handleOnSaveChanges.bind(this);
		this.state = { temperature: '', scale: 'c' };
		this.state = {
			accounts: {},
			token: localStorage.jwtToken,
			loading: false,
		}
		this.getAccounts();
	}

	getAccounts() {
		axios.get("/api/accounts/get", { headers: { 'token': this.state.token } }).then(res => {
			var accounts = res.data;
			delete accounts._id;
			this.setState({ accounts: accounts });
		});
	}

	handleOnSaveChanges() {
		this.setState({ loading: true });
		var accountsToBeUpdated = {};
		Object.keys(this.state.accounts).forEach(accountId => {
			if (this.state.accounts[accountId].action)
				accountsToBeUpdated[accountId] = this.state.accounts[accountId];
		});
		axios.post("/api/accounts/update", { 'accounts': accountsToBeUpdated }).then(res => {
			ToastsStore.info("✔️ Your changes have been saved.");
			this.setState({ loading: false })
		}).catch(err => {
			ToastsStore.info("⚠️ Error Saving Your changes.");
			this.setState({ loading: false })
		});
	}

	handleOnAddAccount() {
		var updatedAccounts = this.state.accounts;
		const newId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + (new Date()).getTime();
		updatedAccounts[newId] = {
			'name': "new",
			'points': '0',
			'instructions': "new",
			'type': "field",
			'action': "new",
		}
		this.setState({ accounts: updatedAccounts });
	}

	handleOnAccountDelete(accountId) {
		var updatedAccounts = this.state.accounts;
		updatedAccounts[accountId].action = "delete"
		this.setState({ accounts: updatedAccounts });
	}

	handleOnAccountChange(accountId, field, value) {
		var updatedAccounts = this.state.accounts;
		updatedAccounts[accountId][field] = value;
		const lastAction = updatedAccounts[accountId].action;
		if (lastAction !== "new") updatedAccounts[accountId].action = "modified"
		this.setState({ accounts: updatedAccounts })
	}

	renderAccountCard(accountId, account) {
		if (account.action === "delete") return (
			<div key={accountId}></div>
		)
		return (
			<div key={accountId}>
				<div className="divider horizontal" />
				<AccountCard
					accountId={accountId}
					account={account}
					onAccountChange={this.handleOnAccountChange}
					onAccountDelete={this.handleOnAccountDelete}
				/>
			</div>
		);
	}

	renderAccountCards() {
		const length = Object.keys(this.state.accounts).length;

		if (length < 1) {
			return (<div className="all-accounts-loading">Loading...</div>)
		}
		var accountsCards = [];
		Object.keys(this.state.accounts).forEach(accountId => {
			accountsCards.push(this.renderAccountCard(accountId, this.state.accounts[accountId]));
		});
		accountsCards.push(<div key="bottomDivider" className="divider horizontal" />);
		return (accountsCards);
	}

	renderSaveButton() {
		if (this.state.loading) {
			return (
				<button disabled className="primary align-horizontally">
					WORKING ON IT...
        </button>
			);
		} else {
			return (
				<button className="primary align-horizontally" onClick={this.handleOnSaveChanges}>SAVE CHANGES</button>
			);
		}
	}

	render() {
		return (
			<div id="accounts" >
				<h2 className="signin-title">Accounts</h2>
				{this.renderAccountCards()}
				<div className="all-accounts-action-section">
					<button className="primary align-horizontally" onClick={this.handleOnAddAccount}>ADD ACCOUNT</button>
					{this.renderSaveButton()}
				</div>
			</div>
		)
	}
}

export default AllAccounts;