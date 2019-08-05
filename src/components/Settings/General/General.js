import React, { Component } from "react";
import { ToastsStore } from 'react-toasts';

import messages from "../../../consts/messages";
import store from "../../../redux/store";
import { getUser, putUserSettings } from "../../../sheard/apis/user";
import { OButton } from "../../core";

import "../../../utils/styles/global.css";
import "./General.css";

class General extends Component {
	constructor(props) {
		super(props);
		var userId;
		if (this.props.ofUser) {
			userId = this.props.ofUser.userId;
		} else {
			userId = store.getState().auth.user.id
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

	async getAccountDetailes() {
		try {
			const user = await getUser(this.state.userId);
			this.setState({
				name: user.name,
				email: user.email,
				points: user.points,
				bonusPoints: user.bonusPoints,
			});
		} catch (err) {
			ToastsStore.info(messages.UNKNOWN_ERROR);
		}
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = async (e) => {
		e.preventDefault();
		this.setState({ loading: true });
		try {
			await putUserSettings(this.state.userId, this.state.name, this.state.email, this.state.bonusPoints);
			ToastsStore.info(messages.SUCCESS_SAVING_CHANGES);
		} catch (err) {
			ToastsStore.info(messages.ERROR_SAVING_CHANGES);
		} finally {
			this.setState({ loading: false });
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
						<OButton
							loading={this.state.loading}
							submit
							type="primary signin-button"
							text="SAVE CHANGES"
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default General;
