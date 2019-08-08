import React, { Component } from 'react';
import { ToastsStore } from 'react-toasts';

import messages from "../../consts/messages";
import { AccountCard } from "./";
import { OButton, OCard } from "../core";
import { getAccounts, putAccounts } from "../../sheard/apis/accounts";

class AllAccounts extends Component {

	constructor(props) {
		super(props);
		this.handleOnAccountChange = this.handleOnAccountChange.bind(this);
		this.handleOnAccountDelete = this.handleOnAccountDelete.bind(this);
		this.handleOnAddAccount = this.handleOnAddAccount.bind(this);
		this.handleOnSaveChanges = this.handleOnSaveChanges.bind(this);
		this.state = {
			accounts: {},
			token: localStorage.jwtToken,
			loading: false,
		}
	}

	componentDidMount() {
		this.loadAccounts();
	}

	async loadAccounts() {
		try {
			const accounts = await getAccounts();
			this.setState({ accounts });
		} catch (err) {
			ToastsStore.info(messages.ERROR_LOADING_DATA);
		}
	}

	async handleOnSaveChanges() {
		this.setState({ loading: true });
		var accountsToBeUpdated = {};
		try {
			Object.keys(this.state.accounts).forEach(accountId => {
				if (this.state.accounts[accountId].action)
					accountsToBeUpdated[accountId] = this.state.accounts[accountId];
			});
			await putAccounts(accountsToBeUpdated);
			ToastsStore.info(messages.SUCCESS_SAVING_CHANGES);
		} catch (err) {
			ToastsStore.info(messages.ERROR_SAVING_CHANGES);
		} finally {
			this.setState({ loading: false });
		}
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
		console.log(field);
		console.log(value);
		
		
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
				<div className="divider" />
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
		accountsCards.push(<div key="bottomDivider" className="divider" />);
		return (accountsCards);
	}

	render() {
		return (
			<OCard>
				<h2>Accounts</h2>
				{this.renderAccountCards()}
				<div className="action-section">

					<OButton
						onClick={this.handleOnAddAccount}
						customStyle="align-horizontally"
						text="ADD FIELD"
					/>

					<OButton
						loading={this.state.loading}
						onClick={this.handleOnSaveChanges}
						customStyle="align-horizontally"
						text="SAVE CHANGES"
					/>
				</div>
			</OCard>
		)
	}
} 

export default AllAccounts;