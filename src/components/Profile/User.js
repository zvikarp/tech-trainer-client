import React from 'react';
import { withRouter } from "react-router-dom";

import { OCard } from '../core';

const User = (props) => {

	const goToSettings = () => {
		console.log(props.user._id);
		
		props.history.push('/settings/' + props.user._id);
	}

	const accountsList = () => {
		const accountsById = props.user.accounts;
		if (accountsById) {
			var userAccounts = [];
			Object.keys(accountsById).forEach(key => {
				userAccounts.push(<div key={key}> {props.accounts[key].name}: {accountsById[key]} </div>);
			});
			return userAccounts;
		} else {
			return "No accounts found";
		}
	}

		return (
			<OCard wide >
				<h2 className="user-name"> {props.user.name} </h2>
					<div>Email: {props.user.email}</div>
					<div>Points: {props.user.points}</div>
					<div>Bonus Points: {props.user.bonusPoints}</div>
					<div>Role: {props.user.role}</div>
					<br />
					<div>Accounts: {accountsList()}</div>
					<br />
					<div>Edit in <span className="link-to-settings" onClick={() => goToSettings()}>Settings</span></div>
			</OCard>
		);
}

export default withRouter(User);