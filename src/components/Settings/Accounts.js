import React, { useEffect, useState } from "react";
import { ToastsStore } from "react-toasts";
import ReactTooltip from "react-tooltip";

import messages from "../../consts/messages";
import { OButton, OInput, OCard } from "../core";
import { getAccounts } from "../../sheard/apis/accounts";
import { updateUserCronjob } from "../../sheard/apis/cronjob";
import { getUserAccounts, putUserAccounts } from "../../sheard/apis/user";
import { resMessageParser } from "../../utils/resParser";

const Accounts = (props) => {

	const [accounts, setAccounts] = useState({});
	const [accountsFields, setAccountsFields] = useState({});
	const [loading, setLoading] = useState(false);
	const userId = props.userId;

	useEffect(() => {
		getAccountsTypes();
		getUsersAccounts();
		// eslint-disable-next-line
	}, []);

	const getUsersAccounts = async () => {
		try {
			const userAccounts = await getUserAccounts(userId);
			setAccountsFields(userAccounts);
		} catch (err) {
			ToastsStore.info(resMessageParser(err, messages.ERROR_LOADING_DATA));
		}
	};

	const getAccountsTypes = async () => {
		try {
			const accounts = await getAccounts();
			setAccounts(accounts);
		} catch (err) {
			ToastsStore.info(resMessageParser(err, messages.ERROR_LOADING_DATA));
		}
	};

	const onAccountChange = (e) => {
		var accountsFieldsTemp = Object.assign({}, accountsFields);
		accountsFieldsTemp[e.target.id] = e.target.value;
		setAccountsFields(accountsFieldsTemp);
		
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await putUserAccounts(userId, accountsFields);
			ToastsStore.info(messages.SUCCESS_SAVING_CHANGES);
			ToastsStore.info(messages.UPDATING_CHART);
			await updateUserCronjob(userId);
			ToastsStore.info(messages.SUCCESS_UPDATING_CHART);
		} catch (err) {
			// TODO: updateUserCronjob return a useful error message
			ToastsStore.info(
				messages.KNOWN_ERROR_PREFIX + resMessageParser(err, messages.ERROR_SAVING_CHANGES)
			);
		} finally {
			setLoading(false);
		}
	};

	const renderAccountField = (key, account) => {
		return (
			<div key={key}>
				<OInput
					label={account.name + ":"}
					onChange={onAccountChange}
					value={accountsFields[key]}
					id={key}
					tooltip={account.instructions}
				/>
				<ReactTooltip />
			</div>
		);
	};

	const renderAccountFields = () => {
		var renderAccountsFields = [];
		Object.keys(accounts).forEach(key => {
			renderAccountsFields.push(
				renderAccountField(key, accounts[key])
			);
		});
		return renderAccountsFields;
	};

	return (
		<OCard>
			<h2>Connected Accounts Settings</h2>
			<form noValidate onSubmit={onSubmit}>
				{renderAccountFields()}
				<div className="action-section">
					<OButton
						loading={loading}
						submit
						center
						text="SAVE CHANGES"
					/>
				</div>
			</form>
		</OCard>
	);
};

export default Accounts;
