import React, { useState } from 'react';

import { Signup, Signin } from "../components/Auth";

const Auth = () => {

	const [isOnSignin, setIsOnSignin] = useState(true);

	const chagneForm = (isSignin) => {
		setIsOnSignin(isSignin);
	}

	// TODO: file NEEDS cleanup

	const renderForm = () => {
		if (isOnSignin) {
			return (
				<div>
					<Signin onSignin={(user) => this.onSignin(user)} />
					<div className="link-to-signin">new to orange? <span className="link" onClick={() => chagneForm(false)}>sign up here</span>.</div>
				</div>
			);
		} else {
			return (
				<div>
					<Signup />
					<div className="link-to-signin">already a user? <span className="link" onClick={() => chagneForm(true)}>sign in here</span>.</div>
				</div>
			);
		}
	}

	return (
		<div id="auth">
			<h1>Connect to Orange <span role="img" aria-label="emoji">🧡</span></h1>
			{renderForm()}
		</div>
	)
};

export default Auth;