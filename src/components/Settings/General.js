import React, { useEffect, useState } from "react";
import { ToastsStore } from 'react-toasts';

import messages from "../../consts/messages";
import { getUser, putUserSettings } from "../../sheard/apis/user";
import { OButton, OInput, OCard } from "../core";
import { resMessageParser } from "../../utils/resParser";

const General = () => {

	const [accounts, setAccounts] = useState({});
	const [loading, setLoading] = useState(false);
	const userId = "";

	useEffect(() => {
		loadData();
		// eslint-disable-next-line
	}, [userId])

	const loadData = () => {
		if (userId) {
			getAccountDetailes();
		}
	}

	const getAccountDetailes = async () => {
		try {
			const user = await getUser(userId);
			setAccounts({
				name: user.name,
				email: user.email,
				points: user.points,
				bonusPoints: user.bonusPoints,
			});
		} catch (err) {
			ToastsStore.info(resMessageParser(err, messages.UNKNOWN_ERROR));
		}
	}

	const onChange = (e) => {
		var updatedAccounts = accounts;
		updatedAccounts[e.target.id] = e.target.value;
		setAccounts(updatedAccounts);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await putUserSettings(userId, accounts.name, accounts.email, accounts.bonusPoints);
			ToastsStore.info(messages.SUCCESS_SAVING_CHANGES);
		} catch (err) {
			ToastsStore.info(resMessageParser(err, messages.ERROR_SAVING_CHANGES));
		} finally {
			setLoading(false);
		}
	}

	return (
		<OCard>
			<h2>General Settings</h2>
			<form noValidate onSubmit={onSubmit}>

				<OInput
					label="Name:"
					onChange={onChange}
					value={accounts.name}
					id="name"
				/>

				<OInput
					label="Email:"
					onChange={onChange}
					value={accounts.email}
					id="email"
					type="email"
				/>

				<OInput
					label="Points:"
					value={accounts.points}
					id="points"
					disabled
				/>

				<OInput
					label="Bonus Points:"
					value={accounts.bonusPoints}
					id="bonusPoints"
					disabled={!userId}
				/>

				<div className="action-section">
					<OButton loading={loading} submit center text="SAVE CHANGES" />
				</div>
			</form>
		</OCard>
	);
}

export default General;
