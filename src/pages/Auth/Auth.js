import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Signup, Signin } from "../../components/Auth";
import { OButton } from "../../components/core";
import { SignupNewUser, SigninUser } from "../../redux/actions/authActions";

import "../../utils/styles/global.css";
import "./Auth.css";

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signup: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push("/");
		}
	}

	chagneForm() {
		this.setState({ signup: !this.state.signup });
	}

	onSignup(user) {
		this.props.SignupNewUser(user, this.props.history);
	}

	onSignin(user) {
		this.props.SigninUser(user, this.props.history);
	}

	renderForm() {
		if (this.state.signup) {
			return (
				<div>
					<Signup onSignup={(user) => this.onSignup(user)} />
					<div className="link-to-signin">already a user? <span className="link" onClick={() => this.chagneForm()}>sign in here</span>.</div>
				</div>
			);
		} else {
			return (
				<div>
					<Signin onSignin={(user) => this.onSignin(user)} />
					<div className="link-to-signin">new to orange? <span className="link" onClick={() => this.chagneForm()}>sign up here</span>.</div>
				</div>
			);
		}
	}

	render() {
		return (
			<div id="auth">
				<OButton
					customStyle="back-button"
					onClick={() => this.props.history.push("/")}
					icon="fas fa-chevron-left"
					text="BACK"
				/>
				<h1 className="auth-message">Connect to Orange <span role="img" aria-label="emoji">🧡</span></h1>
				{this.renderForm()}
			</div>
		)
	}
};

Auth.propTypes = {
	SignupNewUser: PropTypes.func.isRequired,
	SigninUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ SignupNewUser, SigninUser }
)(withRouter(Auth));