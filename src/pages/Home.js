import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";

import useGlobal from "../store";
import messages from "../consts/messages";
import { Welcome, Table } from "../components/Home";
import { ONavBar } from "../components/core";
import { getChart } from "../sheard/apis/chart";
import navButtons from "../consts/navButtons";
import setAuthToken from "../utils/auth/setAuthToken";

const Home = () => {

	useEffect(() => {
		setChart();
	});
	
	const signoutUser = () => {
		localStorage.removeItem("jwtToken");
		setAuthToken(false);
		globalActions.signoutUser();
	};
	
	const setChart = async () => {
		try {
			const chart = await getChart();
			setChartData({ loaded: true, ...chart.data });
		} catch (err) {
			ToastsStore.info(messages.ERROR_LOADING_DATA);
		}
	};
	
	const initalCartData = { top3: [], passed: [], under: [], loaded: false };
	const [globalState, globalActions] = useGlobal();
	const [chartData, setChartData] = useState(initalCartData);
	const adminButtons = globalState.isAdmin ? [navButtons.ADMIN] : [];
	const authedNavButtons = [...adminButtons, navButtons.SETTINGS, navButtons.PROFILE, navButtons.SIGN_OUT(signoutUser)];
	const visitorNavButtons = [navButtons.SIGN_IN];
	console.log(globalState.userId);
	

	return (
		<div>
			<ONavBar rightSide={globalState.isAuthed ? authedNavButtons : visitorNavButtons} />
			<Welcome userName={globalState.userName} />
			<Table isAdmin={globalState.isAdmin} {...chartData} />
		</div>
	);
};

export default Home;