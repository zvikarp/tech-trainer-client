import React, { useEffect, useState } from "react";
import { ToastsStore } from 'react-toasts';

import messages from "../../consts/messages";
import store from "../../redux/store";
import { getUser, putUserSettings } from "../../sheard/apis/user";
import { OButton, OInput } from "../core";

const General = () => {

	// constructor(props) {
	// 	super(props);
	// 	var userId;
	// 	if (props.ofUser) {
	// 		userId = props.ofUser.userId;
	// 	} else {
	// 		userId = store.getState().auth.user.id
	// 	}
	// 	state = {
	// 		name: "",
	// 		email: "",
	// 		points: 0,
	// 		bonusPoints: 0,
	// 		loading: false,
	// 		userId: userId,
	// 	};
	// }

	const [accounts, setAccounts] = useState({});
	const [loading, setLoading] = useState(false);
	const userId = "";

	useEffect(() => {
		getAccountDetailes();
	}, [])

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
			ToastsStore.info(messages.UNKNOWN_ERROR);
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
			ToastsStore.info(messages.ERROR_SAVING_CHANGES);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div id="general">
			<h2 className="signin-title">General Settings</h2>
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
		</div>
	);
}

export default General;