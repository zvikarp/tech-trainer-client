import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";

import useGloble from "../globalHook/store";
import messages from "../consts/messages";
import { Welcome, TopThree, Passed, Under, Graph } from "../components/Home";
import { getLastChart, getCharts } from "../sheard/apis/chart";
import { getSettingsPassing } from "../sheard/apis/accounts";
import { resMessageParser } from "../utils/resParser";
import { OLoading } from "../components/core";

const Home = () => {

	const initalLastCartData = { top3: [], passed: [], under: [], loaded: false };
	const initalCartsData = { chart: { categories: [], series: [], loaded: false } };
	const [lastChartData, setLastChartData] = useState(initalLastCartData);
	const [chartsData, setChartsData] = useState(initalCartsData);
	const [passing, setPassing] = useState(50);
	const [globalState,] = useGloble();

	const passingPoints = passing; 


	useEffect(() => {
		getPassing();
		setChart();
		getGraph();
		// eslint-disable-next-line
	}, [passingPoints]);

	// sort by points of user in array
	function sortUsersByPoints(a, b) {
		if (a.points > b.points) return -1;
		return 1;
	}

	const getPassing = async () => {
		try {
			const passing = await getSettingsPassing();
			setPassing(passing);
		} catch (err) {
			ToastsStore.info(resMessageParser(err, messages.ERROR_LOADING_DATA));
		}
	}

	const getGraph = async () => {
		if (!globalState.isAdmin) return;
		try {
			const graphRes = await getCharts();
			var users = {};
			var dates = [];
			Object.values(graphRes).forEach(doc => {
				dates.push(doc.timestamp);
				if (!doc.users) return;
				doc.users.forEach(user => {
					if (!users[user.id]) users[user.id] = { name: user.name, points: [] };
					users[user.id].points.push(user.points);
				});
			});
			var series = [];
			const categories = dates
			Object.keys(users).forEach(user => {
				series.push({
					name: users[user].name,
					data: users[user].points,
				});
			});
			const charts = {
				series: series,
				categories: categories,
				loaded: true,
			}
			await setChartsData(charts);
		} catch (err) {
			ToastsStore.info(resMessageParser(err, messages.ERROR_LOADING_DATA));
		}
	}

	const setChart = async () => {
		try {
			const returnChart = await getLastChart();
			var chart = Array.prototype.slice.call(returnChart.users);
			chart = chart.sort(sortUsersByPoints);
			var passed = [];
			var under = [];
			for (var i = 0; i < chart.length; i++) {
				if (chart[i].points > passingPoints) passed.push(chart[i]);
				else under.push(chart[i]);
			}
			const top3 = passed.splice(0, 3);
			setLastChartData({ loaded: true, top3, passed, under });
		} catch (err) {
			ToastsStore.info(resMessageParser(err, messages.ERROR_LOADING_DATA));
		}
	};

	const renderGraph = () => {
		if (chartsData.loaded)
			return <Graph chart={chartsData} />;
		else if (globalState.isAdmin)
			return <OLoading />;
		else 
			return < div />;
	}


	return (
		<div>
			<Welcome userName={globalState.userName} />
			<TopThree isAdmin={globalState.isAdmin} top3={lastChartData.top3} loaded={lastChartData.loaded} />
			{renderGraph()}
			<Passed isAdmin={globalState.isAdmin} passed={lastChartData.passed} loaded={lastChartData.loaded} passing={passingPoints} />
			<Under isAdmin={globalState.isAdmin} under={lastChartData.under} loaded={lastChartData.loaded} passing={passingPoints} />
		</div>
	);
};

export default Home;