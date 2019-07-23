import React, { Component } from 'react';
import store from "../../../redux/store";
import "../../../utils/styles/global.css";
import "./User.css";


class User extends Component {

	accountsList() {
		const accounts = this.props.user.accounts;
		if (accounts) {
			return Object.keys(accounts).join(", ");
		} else {
			return "No accounts found";
		}
	}

	render() {
		return (
			<div id="user">
				<h2 className="user-points"> {this.props.user.name} </h2>
				<div class="user-account-detailes">
					<div>Email: {this.props.user.email}</div>
					<div>Points: {this.props.user.points}</div>
					<div>Role: {this.props.user.role}</div>
				</div>
				<div class="user-account-detailes">
					<div>Accounts: {this.accountsList()}</div>
				</div>
			</div>
		);
	}
}

export default User;