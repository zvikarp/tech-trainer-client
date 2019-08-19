import React from "react";
import Line from "react-apexcharts";

import { OCard } from "../core";

const History = (props) => {
	const chartOptions = {
		chart: {
			type: "line",
			fontFamily: "Raleway, sans-serif",
			foreColor: "#000000",
			toolbar: {
				show: false
			}
		},
		stroke: {
			width: 5,
			curve: "smooth"
		},

		xaxis: {
			type: "datetime",
			categories: props.history.categories
		},
		markers: {
			size: 4,
			opacity: 0.9,
			colors: ["#FE724D"],
			strokeColor: "000000",
			strokeWidth: 2,

			hover: {
				size: 5
			}
		},
		yaxis: {
			min: 0,
			title: {
				text: "points"
			}
		}
	};
	const chartSeries = props.history.series;

	return (
		<OCard wide>
			<Line
				options={chartOptions}
				series={chartSeries}
				type="line"
				className="history-chart"
			/>
		</OCard>
	);
};

export default History;
