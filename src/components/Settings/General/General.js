import React, { Component } from "react";
import { ToastsStore } from 'react-toasts';
import "../../../utils/styles/global.css";
import "./General.css";
import axios from "axios";

class General extends Component {
	constructor(props) {
		super(props);
		var userId;
		if (this.props.ofUser) {
			userId = this.props.ofUser.userId;
		}
		this.state = {
			name: "",
			email: "",
			points: 0,
			bonusPoints: 0,
			loading: false,
			userId: userId,
		};
	}

	componentDidMount() {
		this.getAccountDetailes();
	}

	getAccountDetailes() {
		axios.get("/api/user/get", { headers: { 'token': localStorage.jwtToken, userid: this.state.userId } })
			.then(res => {
				this.setState({
					name: res.data.user.name,
					email: res.data.user.email,
					points: res.data.user.points,
					bonusPoints: res.data.user.bonusPoints,
				});
			})
			.catch(err => {
				ToastsStore.info("⚠️ Unknown Error");
			});
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		this.setState({ loading: true });
		console.log(this.state.bonusPoints);

		axios.post("/api/user/settings/update", {
			'name': this.state.name,
			'email': this.state.email,
			'bonusPoints': this.state.userId ? this.state.bonusPoints : 0,
		},
			{
				headers: {
					'Content-Type': 'application/json',
					'userid': this.state.userId,
				}
			}).then(res => {
				if (res.data.success)
					ToastsStore.info("✔️ Your changes have been saved.");
				else
					ToastsStore.info("⚠️ Error Saving Your changes.");

				this.setState({ loading: false });
			}).catch(err => {
				ToastsStore.info("⚠️ Error Saving Your changes.");
				this.setState({ loading: false });
			});
	};

	renderSaveButton() {
		if (this.state.loading) {
			return (
				<button disabled className="signin-button">
					WORKING ON IT...
        </button>
			);
		} else {
			return (
				<button className="primary signin-button" type="submit">
					SAVE CHANGES
        </button>
			);
		}
	}

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
						<input
							value={this.state.points}
							id="points"
							type="text"
							disabled
							/>
					</div>
					<div className="labeld-input">
						<label>Bonus Points:</label>
						<input
							onChange={this.onChange}
							value={this.state.bonusPoints}
							id="bonusPoints"
							type="text"
							disabled={!this.state.userId}
						/>
					</div>
					<div className="action-section">
						{this.renderSaveButton()}
					</div>
				</form>
			</div>
		);
	}
}

export default General;
