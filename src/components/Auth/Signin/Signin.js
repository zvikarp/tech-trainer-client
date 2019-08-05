import React, { Component } from "react";

import store from "../../../redux/store";
import { OButton, OInput } from "../../core";

import "../../../utils/styles/global.css";
import "./Signin.css";

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
		};
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		this.props.onSignin({
			email: this.state.email,
			password: this.state.password
		});
	};

	render() {
		return (
			<div id="signin">
				<h2 className="signin-title"> Sign In </h2>
				<form noValidate onSubmit={this.onSubmit}>
					<OInput
						label="Email:"
						onChange={this.onChange}
						value={this.state.email}
						id="email"
						type="email"
					/>
					<OInput
						label="Password:"
						onChange={this.onChange}
						value={this.state.password}
						id="password"
						type="password"
					/>
					<div className="action-section">
						<OButton loading={store.getState().auth.loading} submit center text="SIGN IN" />
					</div>
				</form>
			</div>
		);
	}
}

export default Signin;
