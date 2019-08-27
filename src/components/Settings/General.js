import React, { useEffect, useState } from "react";
import { ToastsStore } from "react-toasts";

import messages from "../../consts/messages";
import { getUser, putUserSettings } from "../../sheard/apis/user";
import { OButton, OInput, OCard, OLoading } from "../core";
import { resMessageParser } from "../../utils/resParser";

const General = props => {
	const [accounts, setAccounts] = useState({});
	const [loading, setLoading] = useState(false);
	const userId = props.userId;

	useEffect(() => {
		loadData();
		// eslint-disable-next-line
	}, [userId]);

	const loadData = () => {
		if (userId) {
			getAccountDetailes();
		}
	};

	const getAccountDetailes = async () => {
		try {
			const user = await getUser(userId);
			setAccounts({
				name: user.name,
				email: user.email,
				points: user.points,
				password: "",
				bonusPoints: user.bonusPoints || 0
			});
		} catch (err) {
			ToastsStore.info(resMessageParser(err, messages.UNKNOWN_ERROR));
		}
	};

	const onChange = e => {
		var updatedAccounts = Object.assign({}, accounts);
		updatedAccounts[e.target.id] = e.target.value;
		setAccounts(updatedAccounts);
	};

	const onSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			await putUserSettings(
				userId,
				accounts.name,
				accounts.email,
				accounts.password,
				accounts.bonusPoints
			);
			ToastsStore.info(messages.SUCCESS_SAVING_CHANGES);
		} catch (err) {
			ToastsStore.info(resMessageParser(err, messages.ERROR_SAVING_CHANGES));
		} finally {
			setLoading(false);
		}
	};

	const renderAdminOptions = () => {
		if (props.isAdmin) {
			return (
				<OInput
					label="Bonus Points:"
					onChange={onChange}
					value={accounts.bonusPoints}
					id="bonusPoints"
					type="number"
				/>
			);
		} else {
			return <div />;
		}
	};

	const renderFields = () => {
		return (
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
					label="New Password:"
					onChange={onChange}
					value={accounts.password}
					id="password"
					type="password"
				/>

				{renderAdminOptions()}

				<div className="action-section">
					<OButton loading={loading} submit center text="SAVE CHANGES" />
				</div>
			</form>
		);
	};

	const renderForm = () => {
		if (accounts.name) return renderFields();
		else return <OLoading />;
	};

	return (
		<OCard>
			<h2>General Settings</h2>
			{renderForm()}
		</OCard>
	);
};

export default General;
