import React, { Component } from 'react';
import Line from "react-apexcharts";

import store from "../../../redux/store";

import "../../../utils/styles/global.css";
import "./History.css";

class History extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: store.getState().auth.user,
			token: localStorage.jwtToken,
			options: {
				chart: {
					type: 'line',
					fontFamily: 'Raleway, sans-serif',
					foreColor: '#ffffff',
					toolbar: {
						show: false,
					},
				},
				stroke: {
					width: 5,
					curve: 'smooth'
				},

				xaxis: {
					type: 'datetime',
					categories: this.props.history.categories,

				},
				markers: {
					size: 4,
					opacity: 0.9,
					colors: ['#FFFFFF'],
					strokeColor: "FFFFFF",
					strokeWidth: 2,

					hover: {
						size: 5,
					}
				},
				yaxis: {
					min: 0,
					title: {
						text: 'points',
					},
				}
			},
			series: this.props.history.series,
		};
	}



	render() {
		return (
			<div id="history">
				<Line
					options={this.state.options}
					series={this.state.series}
					type="line"
					className="history-chart"
				/>
			</div>
		);
	}
}

export default History;