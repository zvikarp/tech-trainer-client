import React, { Component } from "react";

import { OButton, OInput } from "../../core";

import "../../../utils/styles/global.css";
import "./Signup.css";

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			name: "",
			email: "",
			password: ""
		};
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
		};
		this.props.onSignup(newUser);
	};

	render() {
		return (
			<div id="signup">
				<h2 className="signup-title"> Sign Up </h2>
				<form noValidate onSubmit={this.onSubmit}>
					<OInput
						label="Name:"
						onChange={this.onChange}
						value={this.state.name}
						id="name"
					/>
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
						<OButton loading={this.state.loading} submit center text="SIGN UP" />
					</div>
				</form>
			</div>
		);
	}
}
export default Signup;
