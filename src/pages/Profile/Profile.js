import React, { Component } from "react";
import { User, History } from '../../components/Profile';
import axios from "axios";
import { ToastsStore } from 'react-toasts';
import "../../utils/styles/global.css";
import "./Profile.css";

class Profile extends Component {

	constructor(props) {
		super(props);
		const data = this.props.location.data;
		console.log(data);
		var userId;
		if (data) {
			userId = data.userId;
		}
		console.log(userId);
		this.state = {
			token: localStorage.jwtToken,
			user: {},
			history: {},
			userId: userId
		};
		
	}


	componentDidMount() {
		this.getUser();
		this.getHistory();
	}

	getUser() {
		axios.get("https://board2675.herokuapp.com/api/user/get", { headers: { token: this.state.token, userid: this.state.userId } })
			.then(res => {
				this.setState({ user: res.data.user })
			}).catch(err => {
				ToastsStore.info("⚠️ Error Loading Data.");
				console.log(err);
			});
		this.setState({ user: this.state.user });
	}

	getHistory() {
		axios.get("https://board2675.herokuapp.com/api/history/get", { headers: { 'token': this.state.token, userid: this.state.userId } }).then(res => {
			var accounts = {};
			var dates = [];
			Object.values(res.data).forEach(doc => {
				dates.push(doc.timestamp);
				if (!accounts.points) accounts.points = [];
				accounts.points.push(doc.points);
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

	renderLoading() {
		return (<div className="profile-loading">Loading...</div>);
	}

	renderUser() {
		if (this.state.user.name) {
			return (<User user={this.state.user} />);
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
				<i className="fas fa-chevron-left icon-button back-button" onClick={() => this.props.history.push('/')}></i>
				{this.renderUser()}
				{this.renderHistory()}
			</div>
		);
	}

}

export default Profile