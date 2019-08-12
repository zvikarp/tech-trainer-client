import React, { useState } from 'react';
// import { withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";

import { Signup, Signin } from "../components/Auth";
// import { SignupNewUser, SigninUser } from "../redux/actions/authActions";

const Auth = () => {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		signup: false,
	// 	};
	// }

	// componentWillReceiveProps(nextProps) {
	// 	if (nextProps.auth.isAuthenticated) {
	// 		this.props.history.push("/");
	// 	}
	// }

	const [isOnSignin, setIsOnSignin] = useState(true);

	const chagneForm = (isSignin) => {
		setIsOnSignin(isSignin);
	}

	// onSignup(user) {
	// 	this.props.SignupNewUser(user, this.props.history);
	// }

	// onSignin(user) {
	// 	this.props.SigninUser(user, this.props.history);
	// }

	const renderForm = () => {
		if (isOnSignin) {
			return (
				<div>
					<Signin onSignin={(user) => this.onSignin(user)} />
					{/* <Signin onSignin={(user) => this.onSignin(user)} /> */}
					<div className="link-to-signin">new to orange? <span className="link" onClick={() => chagneForm(false)}>sign up here</span>.</div>
				</div>
			);
		} else {
			return (
				<div>
					<Signup />
					{/* <Signup onSignup={(user) => this.onSignup(user)} /> */}
					<div className="link-to-signin">already a user? <span className="link" onClick={() => chagneForm(true)}>sign in here</span>.</div>
				</div>
			);
		}
	}

		return (
			<div id="auth">
				<h1 className="auth-message">Connect to Orange <span role="img" aria-label="emoji">🧡</span></h1>
				{renderForm()}
			</div>
		)
};

// Auth.propTypes = {
// 	SignupNewUser: PropTypes.func.isRequired,
// 	SigninUser: PropTypes.func.isRequired,
// 	auth: PropTypes.object.isRequired,
// 	errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
// 	auth: state.auth,
// 	errors: state.errors
// });

// export default connect(
// 	mapStateToProps,
// 	{ SignupNewUser, SigninUser }
// )(withRouter(Auth));

export default Auth;