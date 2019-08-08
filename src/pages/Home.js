import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";

import messages from "../consts/messages";
import { Welcome, Table } from "../components/Home";
import { getChart } from "../sheard/apis/chart";

const Home = () => {

	useEffect(() => {
		setChart();
	}, []);
	
	const setChart = async () => {
		try {
			const chart = await getChart();
			setChartData({ loaded: true, ...chart.data });
		} catch (err) {
			ToastsStore.info(messages.ERROR_LOADING_DATA);
		}
	};
	
	const initalCartData = { top3: [], passed: [], under: [], loaded: false };
	const [chartData, setChartData] = useState(initalCartData);

	return (
		<div>
			<Welcome userName />
			<Table isAdmin {...chartData} />
		</div>
	);
};

export default Home;