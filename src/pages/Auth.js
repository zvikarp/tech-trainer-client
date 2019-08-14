import React, { useState } from "react";

import { Signup, Signin } from "../components/Auth";

const Auth = () => {
	const [isOnSignin, setIsOnSignin] = useState(true);

	const chagneForm = isSignin => {
		setIsOnSignin(isSignin);
	};

	const renderSignin = () => {
		return (
			<div>
				<Signin onSignin={user => this.onSignin(user)} />
				<h4>
					{"new to orange? "}
					<span onClick={() => chagneForm(false)}>sign up here</span>
				</h4>
			</div>
		);
	};

	const renderSignup = () => {
		return (
			<div>
				<Signup />
				<h4>
					{"already a user? "}
					<span onClick={() => chagneForm(true)}>sign in here</span>
				</h4>
			</div>
		);
	};

	const renderForm = isOnSignin ? renderSignin : renderSignup;

	return (
		<div>
			<h1>
				Connect to Orange{" "}
				<span role="img" aria-label="emoji">
					🧡
				</span>
			</h1>
			{renderForm()}
		</div>
	);
};

export default Auth;
