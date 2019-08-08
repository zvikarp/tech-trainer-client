import React, { Component } from "react";

import { OButton, OInput, OCard } from "../core";

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
			<OCard>
				<h2> Sign Up </h2>
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
			</OCard>
		);
	}
}
export default Signup;
