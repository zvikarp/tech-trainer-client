import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";

import useGloble from "../store";
import messages from "../consts/messages";
import { Welcome, TopThree, Passed, Under, Graph } from "../components/Home";
import { getLastChart, getCharts } from "../sheard/apis/chart";
import { resMessageParser } from "../utils/resParser";
import { OLoading } from "../components/core";

const Home = () => {

	useEffect(() => {
		setChart();
		getGraph();
		// TODO: fix this and all the other ones
		// eslint-disable-next-line
	}, []);

	// sort by points of user in array
	function sortUsersByPoints(a, b) {
		if (a.points > b.points) return -1;
		return 1;
	}

	const getGraph = async () => {
		
		try {
			const graphRes = await getCharts();
			var series = [];
			var categories = [];
			Object.values(graphRes.data).forEach(doc => {
				categories.push(doc.timestamp);
				doc.users.forEach(user => {
					series.push({
						name: user.id,
						data: user.points,
					});
				});
			});
			const chart = {
				series: series,
				categories: categories,
				loaded: true,
			}
			await setChartsData({chart});			
		} catch (err) {
			console.log(err);
			
			ToastsStore.info(resMessageParser(err, messages.ERROR_LOADING_DATA));
		}
	}

	const setChart = async () => {
		try {
			const returnChart = await getLastChart();
			var chart = Array.prototype.slice.call(returnChart.data.users);
			chart = chart.sort(sortUsersByPoints);
			const top3 = chart.splice(0, 3);
			var passed = [];
			var under = [];
			for (var i = 0; i < chart.length; i++) {
				if (chart[i].points > 50) passed.push(chart[i]);
				else under.push(chart[i]);
			}
			setLastChartData({ loaded: true, top3, passed, under });
		} catch (err) {
			console.log(err);

			ToastsStore.info(resMessageParser(err, messages.ERROR_LOADING_DATA));
		}
	};

	const renderGraph = () => {
		if (chartsData.chart.loaded) {
			return <Graph {...chartsData} />;
		} else {
			return <OLoading />;
		}
	}

	const initalLastCartData = { top3: [], passed: [], under: [], loaded: false };
	const initalCartsData = { chart:{ categories: [], series: [], loaded: false} };
	const [lastChartData, setLastChartData] = useState(initalLastCartData);
	const [chartsData, setChartsData] = useState(initalCartsData);
	const [globalState,] = useGloble();

	// TODO: why to the widgets need ALL cart data not just their part
	return (
		<div>
			<Welcome userName={globalState.userName} />
			<TopThree isAdmin={globalState.isAdmin} {...lastChartData} />
			{renderGraph()}
			<Passed isAdmin={globalState.isAdmin} {...lastChartData} />
			<Under isAdmin={globalState.isAdmin} {...lastChartData} />
		</div>
	);
};

export default Home;