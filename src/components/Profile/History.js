import React from "react";
import Line from "react-apexcharts";

const History = props => {
	const chartOptions = {
		chart: {
			type: "line",
			fontFamily: "Raleway, sans-serif",
			foreColor: "#ffffff",
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
			colors: ["#FFFFFF"],
			strokeColor: "FFFFFF",
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

	// TODO: do something  with points and all point...

	return (
		<div id="history">
			<Line
				options={chartOptions}
				series={chartSeries}
				type="line"
				className="history-chart"
			/>
		</div>
	);
};

export default History;
