import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";

import useGlobal from "../../globalHook/store";
import messages from "../../consts/messages";
import { NavBar, Welcome, Table } from "../../components/Chart";
import { getChart } from "../../sheard/apis/chart";

import "../../utils/styles/global.css";
import "./Chart.css";

const Chart = () => {
	useEffect(() => {
		SetChart();
	}, []);

	const initalCartData = { top3: [], passed: [], under: [], loaded: false };
	const [globalState, ] = useGlobal();
	const [chartData, setChartData] = useState(initalCartData);

	const SetChart = async () => {
		try {
			const chart = await getChart();
			setChartData({ loaded: true, ...chart.data });
		} catch (err) {
			ToastsStore.info(messages.ERROR_LOADING_DATA);
		}
	};

	return (
		<div>
			<NavBar userId={globalState.userId} isAdmin={globalState.isAdmin} />
			{/* <div className="top-section">{this.renderAuth()}</div> */}
			<Welcome userName={globalState.userName} />
			<Table isAdmin={globalState.isAdmin} {...chartData} />
			{/* <div className="last-updated">
				last updated at: {this.renderLastUpdatedChart()}
			</div> */}
		</div>
	);
};

export default Chart;

// constructor(props) {
// 	super(props);
// 	this.state = {
// 		authed: store.getState().auth.isAuthenticated,
// 		user: store.getState().auth.user,
// 		admin: false,
// 		token: localStorage.jwtToken,
// 		top3: [],
// 		passed: [],
// 		under: [],
// 		lastUpdatedChart: "",
// 		loaded: false,
// 	};
// }

// componentDidMount() {
// 	this.loadChart();
// }

// async loadChart() {
// 	try {
// 		const chart = await getChart();
// 		if (this.state.token) this.updateAdminStatus();
// 		this.setState({
// 			top3: chart.data.top3,
// 			passed: chart.data.passed,
// 			under: chart.data.under,
// 			lastUpdatedChart: chart.data.lastUpdated,
// 			loaded: true,
// 		});
// 	} catch (err) {
// 		ToastsStore.info(messages.ERROR_LOADING_DATA);
// 	}
// }

// async updateAdminStatus() {
// 	try {
// 		const isAdminRes = await checkIfAdmin(this.state.user.id);
// 		const isAdmin = isAdminRes.data.admin;
// 		this.setState({ admin: isAdmin });
// 	} catch (err) {
// 		ToastsStore.info(messages.ERROR_LOADING_DATA);
// 	}
// }

// signout = e => {
// 	this.props.LogoutUser();
// 	window.location.reload();
// };

// renderAdminButton() {
// 	if (this.state.admin) {
// 		return (
// 			<OButton
// 				text="ADMIN"
// 				icon="fas fa-unlock-alt"
// 				onClick={() => this.props.history.push("/admin")}
// 			/>
// 		);
// 	}
// }

// welcomeMessage() {
// 	if (this.state.authed) {
// 		return (
// 			<h1 className="chart-message">
// 				Hi {this.state.user.name}
// 				<span role="img" aria-label="emoji">👋</span>
// 			</h1>
// 		);
// 	} else {
// 		return (
// 			<h1 className="chart-message">
// 				Welcome to Orange
//         <span role="img" aria-label="emoji">👋</span>
// 			</h1>
// 		);
// 	}
// }

// renderLastUpdatedChart() {
// 	if (!this.state.lastUpdatedChart || this.state.lastUpdatedChart === "") {
// 		return <span className="last-updated-loading">Loading...</span>;
// 	} else {
// 		const lastUpdatedAsDate = new Date(this.state.lastUpdatedChart);
// 		const lastUpdated = lastUpdatedAsDate.getDate() + "-" + (lastUpdatedAsDate.getMonth() + 1) + "-" + lastUpdatedAsDate.getFullYear()
// 		return <span className="last-updated">{lastUpdated}</span>;
// 	}
// }

// renderAuth() {
// 	if (this.state.authed) {
// 		return (
// 			<div className="chart-top-bar-right">
// 				{this.renderAdminButton()}

// 				<OButton
// 					text="SETTINGS"
// 					icon="fas fa-cogs"
// 					onClick={() => this.props.history.push("/settings")}
// 				/>

// 				<OButton
// 					text="PROFILE"
// 					icon="fas fa-user"
// 					onClick={() => this.props.history.push("/profile")}
// 				/>

// 				<OButton
// 					secondary
// 					text="SIGN OUT"
// 					onClick={() => this.signout()}
// 				/>

// 			</div>
// 		);
// 	} else {
// 		return (
// 			<div className="chart-top-bar-right">
// 				<OButton
// 					secondary
// 					onClick={() => this.props.history.push("/auth")}
// 					text="SIGN IN"
// 				/>
// 			</div>
// 		);
// 	}
// }

// render() {
// 	return (
// 		<div>
// 			<div className="top-section">{this.renderAuth()}</div>
// 			{this.welcomeMessage()}
// 			<TopThree top3={this.state.top3} loaded={this.state.loaded} admin={this.state.admin} />
// 			<Passed passed={this.state.passed} loaded={this.state.loaded} admin={this.state.admin} />
// 			<Under under={this.state.under} loaded={this.state.loaded} admin={this.state.admin} />
// 			<div className="last-updated">
// 				last updated at: {this.renderLastUpdatedChart()}
// 			</div>
// 		</div>
// 	);
// }

// Chart.propTypes = {
// 	LogoutUser: PropTypes.func.isRequired
// };

// const mapStateToProps = state => ({});

// export default connect(
// 	mapStateToProps,
// 	{ LogoutUser }
// )(Chart);
