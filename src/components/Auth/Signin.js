import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { ToastsStore } from "react-toasts";
import { withRouter } from "react-router-dom";

import useGlobal from "../../globalHook/store";
import setAuthToken from "../../utils/auth/setAuthToken";
import { OButton, OInput, OCard } from "../core";
import messages from "../../consts/messages"
import { authSignin } from "../../sheard/apis/auth";
import { resMessageParser } from "../../utils/resParser";

const Signin = (props) => {

	const [, globalActions] = useGlobal();
	const [userDetailes, setUserDetailes] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);

	const signinUser = async () => {
		try {
			const credentials = {
				'email': userDetailes.email,
				'password': userDetailes.password,
			}
			setLoading(true);
			const res = await authSignin(credentials);
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
		signinUser();
	};

	return (
		<OCard>
			<h2> Sign In </h2>
			<form noValidate onSubmit={onSubmit}>
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
					<OButton loading={loading} submit center text="SIGN IN" />
					{/* <OButton loading={store.getState().auth.loading} submit center text="SIGN IN" /> */}
				</div>
			</form>
		</OCard>
	);
}

export default withRouter(Signin);
