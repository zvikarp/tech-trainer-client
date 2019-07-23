import React, { Component } from 'react';
import "../../../utils/styles/global.css";
import "./User.css";


class User extends Component {

	accountsList() {
		const accounts = this.props.user.accounts;
		if (accounts) {
			var userAccounts = "";
			Object.keys(accounts).forEach(key => {
				userAccounts += key + ": " + accounts[key] + ", "
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
					<div>Email: {this.props.user.email}</div>
					<div>Points: {this.props.user.points}</div>
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