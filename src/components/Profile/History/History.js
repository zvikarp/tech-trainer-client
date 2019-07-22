import React, { Component } from 'react';
import Line from "react-apexcharts";
import "../../../utils/styles/global.css";
import "./History.css";

class History extends Component {
	constructor(props) {
		super(props);

		this.state = {
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
					categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000',
						'8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001',
						'3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001'
					],
				
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
			series: [
				{
				name: 'Likes',
				data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
			},
			{
				name: 'Likes 2',
				data: [14, 13, 12, 19, 22, 19, 24, 5, 22, 27, 29, 25, 23, 19, 370, 12, 17, 15]
			},
			{
				name: 'Likes 3',
				data: [4, 3, 0, 9, 29, 9, 2, 9, 2, 7, 9, 5, 3, 9, 7, 2, 7, 5]
			}
		],
		};
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