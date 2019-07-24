import React, { Component } from 'react';
import "../../../utils/styles/global.css";
import "./User.css";


class User extends Component {

	accountsList() {
		const accountsById = this.props.user.accounts;
		if (accountsById) {
			var userAccounts = "";
			Object.keys(accountsById).forEach(key => {
				userAccounts += this.props.accounts[key].name + ": " + accountsById[key] + ", "
			});
			return userAccounts;
		} else {
			return "No accounts found";
		}
	}

	render() {
		return (
			<div id="user">
				<h2 className="user-points"> {this.props.user.name} </h2>
				<div className="user-account-detailes">
					<div>Email: {this.props.user.email},</div>
					<div>Points: {this.props.user.points},</div>
					<div>Bonus Points: {this.props.user.bonusPoints},</div>
					<div>Role: {this.props.user.role}</div>
				</div>
				<div className="user-account-detailes">
					<div>Accounts: {this.accountsList()}</div>
				</div>
			</div>
		);
	}
}

export default User;