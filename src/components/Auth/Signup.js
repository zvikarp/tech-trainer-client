import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { ToastsStore } from "react-toasts";
import { withRouter } from "react-router-dom";

import useGlobal from "../../globalHook/store";
import setAuthToken from "../../utils/auth/setAuthToken";
import { OButton, OInput, OCard } from "../core";
import messages from "../../consts/messages"
import { authSignup } from "../../sheard/apis/auth";
import { resMessageParser } from "../../utils/resParser";

const Signup = (props) => {

	const [, globalActions] = useGlobal();
	const [userDetailes, setUserDetailes] = useState({ name: "", email: "", password: "" });
	const [loading, setLoading] = useState(false);

	const signupUser = async (isAdmin) => { // PROD-NOTE: [1/4] remove the prop 'isAdmin' in production.
		try {
			const credentials = {
				'name': userDetailes.name,
				'email': userDetailes.email,
				'password': userDetailes.password,
				'admin': isAdmin // PROD-NOTE: [2/4] delete this row in production.
			};
			setLoading(true);
			const res = await authSignup(credentials);
			const token = res.token;
			localStorage.setItem("jwtToken", token);
			setAuthToken(token);
			const user = jwt_decode(token);
			globalActions.updateUser(user);
			props.history.push("/");
		} catch (err) {
			ToastsStore.info(messages.KNOWN_ERROR_PREFIX + resMessageParser(err));
		} finally {
			setLoading(false);
		}
	}

	const onChange = (e) => {
		var updatedUserDetailes = Object.assign({}, userDetailes);
		updatedUserDetailes[e.target.id] = e.target.value;
		setUserDetailes(updatedUserDetailes);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		signupUser();
	};

	// PROD-NOTE: [3/4] delete this function in produnction
	const demoSignupSubmit = (isAdmin) => {
		signupUser(isAdmin);
	};

	return (
		<OCard>
			<h2> Sign Up </h2>
			<form noValidate onSubmit={onSubmit}>
				<OInput
					label="Name:"
					onChange={onChange}
					value={userDetailes.name}
					id="name"
				/>
				<OInput
					label="Email:"
					onChange={onChange}
					value={userDetailes.email}
					id="email"
					type="email"
				/>
				<OInput
					label="Password:"
					onChange={onChange}
					value={userDetailes.password}
					id="password"
					type="password"
				/>
				<div className="action-section">
					{/* PROD-NOTE: [4/4] delete the following two row and uncomment the next on in production */}
					<OButton loading={loading} onClick={() => demoSignupSubmit(true)} center text="SIGN UP AS ADMIN" />
					<OButton loading={loading} onClick={() => demoSignupSubmit(false)} submit center text="SIGN UP AS USER" />
					{/* <OButton loading={loading} submit center text="SIGN UP" /> */}
				</div>
			</form>
		</OCard>
	);

}
export default withRouter(Signup);
