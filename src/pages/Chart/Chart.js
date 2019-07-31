import React, { Component } from "react";
import PropTypes from "prop-types";
import store from "../../redux/store";
import axios from "axios";
import { connect } from "react-redux";
import { ToastsStore } from 'react-toasts';

import { LogoutUser } from "../../redux/actions/authActions";
import { TopThree, Passed, Under } from "../../components/Chart";
import "../../utils/styles/global.css";
import "./Chart.css";

class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authed: store.getState().auth.isAuthenticated,
			user: store.getState().auth.user,
			admin: false,
			token: localStorage.jwtToken,
			top3: [],
			passed: [],
			under: [],
			lastUpdatedChart: "",
			loaded: false,
		};
	}

	componentDidMount() {
		this.getChart();
	}

	getChart() {
		axios.get(process.env.REACT_APP_API_URL + "/chart/").then(res => {
			if (this.state.token) this.checkIfAdmin();
			this.setState({
				top3: res.data.top3,
				passed: res.data.passed,
				under: res.data.under,
				lastUpdatedChart: res.data.lastUpdated,
				loaded: true,
			});
		}).catch(err => {
			ToastsStore.info("⚠️ Error Loading Data.");
		});
	}

	checkIfAdmin() {
		axios.get(process.env.REACT_APP_API_URL + "/user/admin/" + this.state.user.id, { headers: { token: this.state.token } })
			.then(res => {
				var isAdmin = res.data.admin;
				this.setState({ admin: isAdmin });
			}).catch(err => {
				ToastsStore.info("⚠️ Error Loading Data.");
			});
	}

	signout = e => {
		this.props.LogoutUser();
		window.location.reload();
	};

	renderAdminButton() {
		if (this.state.admin) {
			return (
				<button className="primary" onClick={() => this.props.history.push("/admin")}>
					<i className="fas fa-unlock-alt" />
					<div className="button-text">ADIMN</div>
				</button>
			);
		}
	}

	welcomeMessage() {
		if (this.state.authed) {
			return (
				<h1 className="chart-message">
					Hi {this.state.user.name}
					<span role="img" aria-label="emoji">👋</span>
				</h1>
			);
		} else {
			return (
				<h1 className="chart-message">
					Welcome to Orange
          <span role="img" aria-label="emoji">👋</span>
				</h1>
			);
		}
	}

	renderLastUpdatedChart() {
		if (!this.state.lastUpdatedChart || this.state.lastUpdatedChart === "") {
			return <span className="last-updated-loading">Loading...</span>;
		} else {
			const lastUpdatedAsDate = new Date(this.state.lastUpdatedChart);
			const lastUpdated = lastUpdatedAsDate.getDate() + "-" + (lastUpdatedAsDate.getMonth() + 1) + "-" + lastUpdatedAsDate.getFullYear()
			return <span className="last-updated">{lastUpdated}</span>;
		}
	}

	renderAuth() {
		if (this.state.authed) {
			return (
				<div className="chart-top-bar-right">
					{this.renderAdminButton()}
					<button className="primary" onClick={() => this.props.history.push("/settings")}>
						<i className="fas fa-cogs" />
						<div className="button-text">SETTINGS</div>
					</button>
					<button className="primary" onClick={() => this.props.history.push("/profile")}>
						<i className="fas fa-user" />
						<div className="button-text">PROFILE</div>
					</button>
					<button className="secondary" onClick={() => this.signout()}>
						Sign Out
          </button>
				</div>
			);
		} else {
			return (
				<div className="chart-top-bar-right">
					<button
						className="secondary chart-signin-button"
						onClick={() => this.props.history.push("/auth")}
					>
						Sign In
          </button>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<div className="top-section">{this.renderAuth()}</div>
				{this.welcomeMessage()}
				<TopThree top3={this.state.top3} loaded={this.state.loaded} admin={this.state.admin} />
				<Passed passed={this.state.passed} loaded={this.state.loaded} admin={this.state.admin} />
				<Under under={this.state.under} loaded={this.state.loaded} admin={this.state.admin} />
				<div className="last-updated">
					last updated at: {this.renderLastUpdatedChart()}
				</div>
			</div>
		);
	}
}

Chart.propTypes = {
	LogoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
	mapStateToProps,
	{ LogoutUser }
)(Chart);
