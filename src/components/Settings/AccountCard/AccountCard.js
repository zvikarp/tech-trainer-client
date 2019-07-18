import React, { Component } from 'react';
// import axios from "axios";

import "../../../utils/styles/global.css";
import "./AccountCard.css";

class AccountCard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			websites: [],
			token: localStorage.jwtToken
		}
	}


	render() {
		return (
			<div key={this.props.id}>
				<div className="labeld-input">
					<label>Name:</label>
					<input
					disabled={this.props.type==="website"}
						onChange={this.onWebsiteChange}
						value={this.props.name}
						id={this.props.id + "name"}
						type="text"
					/>
				</div>
				<div className="labeld-input">
					<label>Points:</label>
					<input
						onChange={this.onWebsiteChange}
						value={this.props.points}
						id={this.props.id + "points"}
						type="text"
					/>
				</div>
				<div className="labeld-input">
					<label>Instructions:</label>
					<input
						onChange={this.onWebsiteChange}
						value={this.props.points}
						id={this.props.id + "instructions"}
						type="text"
					/>
				</div>
				<div className="labeld-input">
					<label>Type:</label>
					<input
						disabled
						value={this.props.type}
						id={this.props.id + "type"}
						type="text"
					/>
				</div>
			</div>
		);
	}
}

export default AccountCard;