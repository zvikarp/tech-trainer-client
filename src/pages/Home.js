import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";

import useGloble from "../store";
import messages from "../consts/messages";
import { Welcome, TopThree, Passed, Under, Graph } from "../components/Home";
import { getChart } from "../sheard/apis/chart";
import { resMessageParser } from "../utils/resParser";

const Home = () => {

	useEffect(() => {
		setChart();
		// TODO: fix this and all the other ones
		// eslint-disable-next-line
	}, []);

	// sort by points of user in array
	function sortUsersByPoints(a, b) {
		if (a.points > b.points) return -1;
		return 1;
	}

	const setChart = async () => {
		try {
			const returnChart = await getChart();
			var chart = Array.prototype.slice.call(returnChart.data.users);
			chart = chart.sort(sortUsersByPoints);
			const top3 = chart.splice(0, 3);
			var passed = [];
			var under = [];
			for (var i=0; i<chart.length; i++) {
				if (chart[i].points > 50) passed.push(chart[i]);
				else under.push(chart[i]);
			}
				setChartData({ loaded: true, top3, passed, under });
		} catch (err) {
			console.log(err);
			
			ToastsStore.info(resMessageParser(err, messages.ERROR_LOADING_DATA));
		}
	};

	const initalCartData = { top3: [], passed: [], under: [], loaded: false };
	const [chartData, setChartData] = useState(initalCartData);
	const [globalState,] = useGloble();

	return (
		<div>
			<Welcome userName={globalState.userName} />
			<TopThree isAdmin={globalState.isAdmin} {...chartData} />
			<Graph />
			<Passed isAdmin={globalState.isAdmin} {...chartData} />
			<Under isAdmin={globalState.isAdmin} {...chartData} />
		</div>
	);
};

export default Home;