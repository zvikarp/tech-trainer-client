import React from "react";
import { withRouter } from "react-router-dom";

import { OCard } from "../core";

const User = props => {
	const goToSettings = () => {
		const suffix = props.isAdmin ? "/" + props.user._id : "";
		props.history.push("/settings" + suffix);
	};

	const accountsList = () => {		
		const accountsById = props.user.accounts;
		if (accountsById) {
			var userAccounts = [];
			Object.keys(accountsById).forEach(key => {
				if (props.accounts[key])
					userAccounts.push(
						<tr key={key}>
							<td>{props.accounts[key].name}</td>
							<td>{accountsById[key]}</td>
							<td>{accountsById[key].points}</td>
						</tr>
					);
			});
			return userAccounts;
		} else {
			return "No accounts found";
		}
	};

	return (
		<OCard wide>
			<h2 className="user-name"> {props.user.name} </h2>
			<div>Email: {props.user.email}</div>
			<div>Points: {props.user.points}</div>
			<div>Bonus Points: {props.user.bonusPoints}</div>
			<div>Role: {props.user.role}</div>
			<br />
			<div>Accounts: </div>
			<table>
				<tbody>
					{accountsList()}
				</tbody>
			</table>

			<br />
			<div>
				Edit in{" "}
				<span className="link-to-settings" onClick={() => goToSettings()}>
					Settings
				</span>
			</div>
		</OCard>
	);
};

export default withRouter(User);
