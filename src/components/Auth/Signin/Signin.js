import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { ToastsStore } from "react-toasts";
import useGlobal from "../../../globalHook/store";


import setAuthToken from "../../../utils/auth/setAuthToken";
import { OButton, OInput } from "../../core";
import messages from "../../../consts/messages"
import { authSignin } from "../../../sheard/apis/auth";

import "../../../utils/styles/global.css";
import "./Signin.css";


function signinWithHook() {
	return function WrappedComponent(props) {
		const [globalState, globalActions] = useGlobal();
		return <SigninWithHook {...props} globalState={globalState} globalActions={globalActions} />;
	}
}

class SigninWithHook extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			email: "",
			password: "",
		};
	}

	async signinUser(globalActions) {
		try {
			const credentials = {
				'email': this.state.email,
				'password': this.state.password,
			}
			this.setState({ loading: true });
			const res = await authSignin(credentials);
			const token = res.token;
			localStorage.setItem("jwtToken", token);
			setAuthToken(token);
			const user = jwt_decode(token);
			globalActions.updateUser(user);
		} catch (err) {
			ToastsStore.info(messages.KNOWN_ERROR_PREFIX + this.errorToString(""));
		} finally {
			this.setState({ loading: false });
		}
	}

	errorToString(err) { // TODO: make this better...
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
						<OButton loading={this.state.loading} onClick={() => { this.signinUser(this.props.globalActions) }} center text="SIGN IN" />
						{/* <OButton loading={store.getState().auth.loading} submit center text="SIGN IN" /> */}
					</div>
				</form>
			</div>
		);
	}
}

const Signin = signinWithHook();

export default Signin;
