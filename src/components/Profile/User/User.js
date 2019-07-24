import React, { Component } from 'react';
import "../../../utils/styles/global.css";
import "./User.css";


class User extends Component {

	accountsList() {
		const accountsById = this.props.user.accounts;
		if (accountsById) {
			var userAccounts = [];
			Object.keys(accountsById).forEach(key => {
				userAccounts.push(<br />);
				userAccounts.push(this.props.accounts[key].name + ": " + accountsById[key]);
			});
			return userAccounts;
		} else {
			return "No accounts found";
		}
	}

	render() {
		return (
			<div id="user">
				<h2 className="user-name"> {this.props.user.name} </h2>
					<div>Email: {this.props.user.email}</div>
					<div>Points: {this.props.user.points}</div>
					<div>Bonus Points: {this.props.user.bonusPoints}</div>
					<div>Role: {this.props.user.role}</div>
					<br />
					<div>Accounts: {this.accountsList()}</div>
			</div>
		);
	}
}

export default User;