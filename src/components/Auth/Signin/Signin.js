import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastsStore } from "react-toasts";
import { updateUser } from "../../../globalHook/actions";

import setAuthToken from "../../../utils/auth/setAuthToken";
import store from "../../../redux/store";
import { OButton, OInput } from "../../core";
import messages from "../../../consts/messages"

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
	
	errorToString(err) {
		var msg = "";
		const type = Object.prototype.toString.call(err);
		if (type === '[object Object]') {
			Object.keys(err).forEach(key => {
				msg += err[key];
				msg += ". ";
			});
		}
		if (msg === "") msg = "Unknown Error.";
		return msg;
	}
	
	// signinUser(userData) {
	// 	this.setState({ loading: true });
	// 	axios
	// 	.post(process.env.REACT_APP_API_URL + "/auth/login", userData)
	// 	.then(res => {
	// 		try {
	// 			const { token } = res.data;
	// 			localStorage.setItem("jwtToken", token);
	// 			setAuthToken(token);
	// 			const decoded = jwt_decode(token);
	// 			updateUser(decoded);
	// 		} catch {
	// 			ToastsStore.info(messages.KNOWN_ERROR_PREFIX + this.errorToString(""));
	// 		}
	// 		})
	// 		.catch(err => {
	// 			ToastsStore.info(
	// 				messages.KNOWN_ERROR_PREFIX + this.errorToString(err.response.data)
	// 			);
	// 		}).finally(res => {
	// 			this.setState({ loading: false });
	// 		});
	// };

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
						{/* <OButton loading={store.getState().auth.loading} onClick={() => { this.signinUser() }} center text="SIGN IN" /> */}
						<OButton loading={store.getState().auth.loading} submit center text="SIGN IN" />
					</div>
				</form>
			</div>
		);
	}
}

export default Signin;
