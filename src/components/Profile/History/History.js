import React, { Component } from 'react';
import Line from "react-apexcharts";
import "../../../utils/styles/global.css";
import "./History.css";
import store from "../../../redux/store";
import axios from "axios";
import { ToastsStore } from 'react-toasts';

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
					categories: [],
				
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
			series: [],
		};
		this.getHistory();
	}

	getHistory() {
		axios.get("/api/history/get", { headers: { 'token': this.state.token } }).then(res => {
			var accounts = {};
			var dates = [];
			Object.values(res.data).forEach(doc => {
				dates.push(doc.timestamp);
				if(!accounts.points) accounts.points = [];
				accounts.points.push(doc.points);
				Object.keys(doc.accounts).forEach(account => {
					if(!accounts[account]) accounts[account] = [];
					accounts[account].push(doc.accounts[account]);
				});
			});
			var series = [];
			var options = this.state.options;
			options.xaxis.categories = dates
			Object.keys(accounts).forEach(account => {
				series.push({
					name: account,
					data: accounts[account],
				});
			});
			this.setState({
				series: series,
				options: options,
			});
			console.log(this.state.series);
			console.log(this.state.options);
			
		}).catch(err => {
			console.log(err);
			
			ToastsStore.info("⚠️ Error Loading Data.");
		});
	}

	render() {
		return (
			<div className="app">
				<div className="row">
					<div className="mixed-chart">
						<Line
							options={this.state.options}
							series={this.state.series}
							type="line"
							width="80%"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default History;