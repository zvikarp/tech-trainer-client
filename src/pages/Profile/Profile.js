import React, { Component } from "react";
import { ToastsStore } from 'react-toasts';

import messages from "../../consts/messages";
import store from "../../redux/store";
import { User, History } from '../../components/Profile';
import { OButton } from '../../components/core';
import { getAccounts } from "../../sheard/apis/accounts";
import { getHistory } from "../../sheard/apis/history";
import { getUser } from "../../sheard/apis/user";

import "../../utils/styles/global.css";
import "./Profile.css";

class Profile extends Component {
	constructor(props) {
		super(props);
		const data = this.props.location.data;
		var userId;
		if (data) {
			userId = data.userId;
		} else {
			userId = store.getState().auth.user.id
		}
		console.log(userId);
		this.state = {
			token: localStorage.jwtToken,
			user: {},
			history: {},
			accounts: {},
			userId: userId
		};

	}

	componentDidMount() {
		this.loadAccounts();
		this.loadUser();
		this.loadHistory();
	}

	async loadAccounts() {
		try {
			const accounts = await getAccounts(this.state.userId);
			this.setState({ accounts });
		} catch (err) {
			ToastsStore.info(messages.ERROR_LOADING_DATA);
		}
	}

	async loadUser() {
		try {
			const user = await getUser(this.state.userId);
			this.setState({ user })
		} catch (err) {
			ToastsStore.info(messages.ERROR_LOADING_DATA);
		}
	}

	async loadHistory() {
		try {
			const historyRes = await getHistory(this.state.userId);
			var accounts = {};
			var dates = [];
			Object.values(historyRes).forEach(doc => {
				dates.push(doc.timestamp);
				if (!accounts['all points']) accounts['all points'] = [];
				accounts['all points'].push(doc.points);
				if (!doc.accounts) return;
				Object.keys(doc.accounts).forEach(account => {
					if (!accounts[account]) accounts[account] = [];
					accounts[account].push(doc.accounts[account]);
				});
			});
			var series = [];
			const categories = dates
			Object.keys(accounts).forEach(account => {
				series.push({
					name: account,
					data: accounts[account],
				});
			});
			const history = {
				series: series,
				categories: categories,
			}
			this.setState({ history: history });
		} catch (err) {
			ToastsStore.info(messages.ERROR_LOADING_DATA);
		}
	}

	renderSettingsButton() {
		if (this.state.userId) {
			return (
				<OButton
					customStyle="settings-button"
					text="SETTINGS"
					icon="fas fa-cogs"
					onClick={() => this.props.history.push({
						pathname: '/settings',
						data: { "userId": this.state.userId },
					})}
				/>
			);
		} else {
			return (<div />);
		}
	}

	renderLoading() {
		return (<div className="profile-loading">Loading...</div>);
	}

	renderUser() {
		if ((this.state.user.name) && (Object.keys(this.state.accounts).length > 0)) {
			return (<User user={this.state.user} accounts={this.state.accounts} />);
		} else {
			return (this.renderLoading());
		}
	}

	renderHistory() {
		if (this.state.history.categories) {
			return (<History history={this.state.history} />);
		} else {
			return (this.renderLoading());
		}
	}

	render() {
		return (
			<div>
				<OButton
					customStyle="back-button"
					onClick={() => this.props.history.push("/")}
					icon="fas fa-chevron-left"
					text="BACK"
				/>
				{this.renderSettingsButton()}
				{this.renderUser()}
				{this.renderHistory()}
			</div>
		);
	}

}

export default Profile