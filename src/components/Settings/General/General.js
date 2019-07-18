import React, { Component } from "react";
import { ToastsStore } from 'react-toasts';
import "../../../utils/styles/global.css";
import "./General.css";
import axios from "axios";

class General extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			email: this.props.email,
			points: this.props.points,
		};
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		axios
		.post("/api/user/settings/update", { 'name': this.state.name, 'email': this.state.email }, {
			headers: {
				'Content-Type': 'application/json',
			}
		}).then(res => {
			if (res.data.success)
				ToastsStore.info("✔️ Your changes have been saved.");
			else
				ToastsStore.info("⚠️ Error Saving Your changes.");

		}).catch(err => {
			ToastsStore.info("⚠️ Error Saving Your changes.");
		});
	};

	render() {
		return (
			<div id="general">
				<h2 className="signin-title">General Settings</h2>
				<form noValidate onSubmit={this.onSubmit}>
					<div className="labeld-input">
						<label>Name:</label>
						<input
							onChange={this.onChange}
							value={this.state.name}
							id="name"
							type="text"
						/>
					</div>
					<div className="labeld-input">
						<label>Email:</label>
						<input
							onChange={this.onChange}
							value={this.state.email}
							id="email"
							type="email"
						/>
					</div>
					<div className="labeld-input">
						<label>Points:</label>
						<input value={this.state.points} id="points" type="text" disabled />
					</div>
					<div className="action-section">
						<button className="primary signin-button" type="submit">
							SAVE CHANGES
            </button>
					</div>
				</form>
			</div>
		);
	}
}

export default General;
