import React, { Component } from "react";
import { User, History } from '../../components/Profile';
import axios from "axios";
import { ToastsStore } from 'react-toasts';
import store from "../../redux/store";
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
		this.getAccounts();
		this.getUser();
		this.getHistory();
	}

	getAccounts() {
		axios.get(process.env.REACT_APP_API_URL + "/accounts/", { headers: { 'token': this.state.token } }).then(res => {
			var accounts = res.data;
			delete accounts._id;
			this.setState({ accounts: accounts });
		});
	}

	getUser() {
		axios.get(process.env.REACT_APP_API_URL + "/user/" + this.state.userId, { headers: { token: this.state.token } })
			.then(res => {
				this.setState({ user: res.data })
			}).catch(err => {
				ToastsStore.info("⚠️ Error Loading Data.");
				console.log(err);
			});
		this.setState({ user: this.state.user });
	}

	getHistory() {
		axios.get(process.env.REACT_APP_API_URL + "/history/" + this.state.userId, { headers: { 'token': this.state.token } }).then(res => {
			var accounts = {};
			var dates = [];
			Object.values(res.data).forEach(doc => {
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
		}).catch(err => {
			console.log(err);

			ToastsStore.info("⚠️ Error Loading Data.");
		});
	}

	renderSettingsButton() {
		if (this.state.userId) {
			return (
				<button
					className="primary settings-button"
					onClick={() => this.props.history.push({
						pathname: '/settings',
						data: { "userId": this.state.userId },
					})} >
					<i className="fas fa-cogs" />
					<div className="button-text">SETTINGS</div>
				</button>
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
				<button className="primary back-button" onClick={() => this.props.history.push("/")}>
					<i className="fas fa-chevron-left" />
					<div className="button-text">BACK</div>
				</button>
				{this.renderSettingsButton()}
				{this.renderUser()}
				{this.renderHistory()}
			</div>
		);
	}

}

export default Profile