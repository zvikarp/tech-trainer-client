import React from 'react';

const User = (props) => {

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
			<div id="user">
				<h2 className="user-name"> {props.user.name} </h2>
					<div>Email: {props.user.email}</div>
					<div>Points: {props.user.points}</div>
					<div>Bonus Points: {props.user.bonusPoints}</div>
					<div>Role: {props.user.role}</div>
					<br />
					<div>Accounts: {accountsList()}</div>
			</div>
		);
}

export default User;