import React, { useEffect, useState } from 'react';
import { ToastsStore } from 'react-toasts';

import messages from "../../consts/messages";
import { AccountCard } from "./";
import { OButton, OCard, OLoading } from "../core";
import { getAccounts, putAccounts } from "../../sheard/apis/accounts";
import { resMessageParser } from "../../utils/resParser";

const AllAccounts = () => {

	const [accounts, setAccounts] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadAccounts();
	}, []);

	const loadAccounts = async () => {
		try {
			const accounts = await getAccounts();
			setAccounts(accounts);
		} catch (err) {
			ToastsStore.info(resMessageParser(err, messages.ERROR_LOADING_DATA));
		}
	}

	const handleOnSaveChanges = async () => {
		setLoading(true);
		var accountsToBeUpdated = {};
		try {
			Object.keys(accounts).forEach(accountId => {
				if (accounts[accountId].action)
					accountsToBeUpdated[accountId] = accounts[accountId];
			});
			await putAccounts(accountsToBeUpdated);
			ToastsStore.info(messages.SUCCESS_SAVING_CHANGES);
		} catch (err) {
			ToastsStore.info(resMessageParser(err, messages.ERROR_SAVING_CHANGES));
		} finally {
			setLoading(false);
		}
	}

	const handleOnAddAccount = () => {
		var updatedAccounts = Object.assign({}, accounts);
		const newId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + (new Date()).getTime();
		updatedAccounts[newId] = {
			'name': "new",
			'points': '0',
			'instructions': "new",
			'type': "string",
			'prefix': "",
			'suffix': "",
			'path': "",
			'action': "new",
		}
		setAccounts(updatedAccounts);
	}

	const handleOnAccountDelete = (accountId) => {
		var updatedAccounts = Object.assign({}, accounts);
		updatedAccounts[accountId].action = "delete"
		setAccounts(updatedAccounts);
	}

	const handleOnAccountChange = (accountId, field, value) => {

		var updatedAccounts = Object.assign({}, accounts);
		updatedAccounts[accountId][field] = value;
		const lastAction = updatedAccounts[accountId].action;
		if (lastAction !== "new") updatedAccounts[accountId].action = "modified"
		setAccounts(updatedAccounts);
	}

	const renderAccountCard = (accountId, account) => {
		if (account.action === "delete") return (
			<div key={accountId}></div>
		)
		return (
			<div key={accountId}>
				<div className="divider" />
				<AccountCard
					accountId={accountId}
					account={account}
					onAccountChange={handleOnAccountChange}
					onAccountDelete={handleOnAccountDelete}
				/>
			</div>
		);
	}

	const renderAccountCards = () => {
		const length = Object.keys(accounts).length;
		if (length < 1) {
			return (<OCard><OLoading /></OCard>)
		}
		var accountsCards = [];
		Object.keys(accounts).forEach(accountId => {
			accountsCards.push(renderAccountCard(accountId, accounts[accountId]));
		});
		accountsCards.push(<div key="bottomDivider" className="divider" />);
		return (accountsCards);
	}

	return (
		<OCard>
			<h2>Accounts</h2>
			{renderAccountCards()}
			<div className="action-section">

				<OButton
					onClick={handleOnAddAccount}
					customStyle="align-horizontally"
					text="ADD FIELD"
				/>

				<OButton
					loading={loading}
					onClick={handleOnSaveChanges}
					customStyle="align-horizontally"
					text="SAVE CHANGES"
				/>
			</div>
		</OCard>
	)
}

export default AllAccounts;