import React, { Component } from 'react';
import { AccountCard } from '../';
import axios from "axios";

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
			token: localStorage.jwtToken
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
		axios.post("/api/accounts/update", { 'accounts': this.state.accounts }).then(res => {
			console.log(res);
		});
	}

	handleOnAddAccount() {
		var updatedAccounts = this.state.accounts;
		updatedAccounts['newId'] = {
			'name': "new",
			'points': '0',
			'instructions': "new",
			'type': "field",
		}
		this.setState({ accounts: updatedAccounts });
	}

	handleOnAccountDelete(accountId) {
		var updatedAccounts = this.state.accounts;
		delete updatedAccounts[accountId];
		this.setState({ accounts: updatedAccounts });
	}

	handleOnAccountChange(accountId, field, value) {
		var updatedAccounts = this.state.accounts;
		updatedAccounts[accountId][field] = value;
		this.setState({ accounts: updatedAccounts })
	}

	renderAccountCard(accountId, account) {
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
		var accountsCards = [];
		Object.keys(this.state.accounts).forEach(accountId => {
			accountsCards.push(this.renderAccountCard(accountId, this.state.accounts[accountId]));
		});
		return (accountsCards);
	}

	render() {
		return (
			<div id="accounts" >
				<h2 className="signin-title">Accounts</h2>
				{this.renderAccountCards()}
				<div className="divider horizontal" />
				<div className="all-accounts-action-section">
					<button className="primary align-horizontally" onClick={this.handleOnAddAccount}>ADD ACCOUNT</button>
					<button className="primary align-horizontally" onClick={this.handleOnSaveChanges}>SAVE CHANGES</button>
				</div>
			</div>
		)
	}
}

export default AllAccounts;