import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import JwtDecode from "jwt-decode";

import useGloble from "./store";
import { Auth, Home, Settings, Admin, Profile } from './pages/index.js';
import SetAuthToken from "./utils/auth/setAuthToken";
import { ONavBar } from "./components/core";
import navButtons from "./consts/navButtons";
import AuthenticatedRoute from "./utils/auth/AuthenticatedRoute";
import "./utils/styles/global.css";

// this needs to run BEFORE we render the app
if (localStorage.jwtToken) {
	const token = localStorage.jwtToken;
	SetAuthToken(token);
}

const App = () => {

	const [globalState, globalAction] = useGloble();

	useEffect(() => {
		signinUser();
		// eslint-disable-next-line
	}, []);

	const signinUser = () => {
		if (localStorage.jwtToken) {
			const token = localStorage.jwtToken;
			const user = JwtDecode(token);
			globalAction.updateUser(user);
			const currentTime = Date.now() / 1000;
			if (user.exp < currentTime) {
				globalAction.signoutUser();
			}
		} else {
			globalAction.signoutUser();
		}
	}

	const signoutUser = () => {
		localStorage.removeItem("jwtToken");
		SetAuthToken(false);
		globalAction.signoutUser();
		window.location.href = '../';
	};

	const adminButtons = globalState.isAdmin ? [navButtons.ADMIN] : [];
	const authedNavButtons = [navButtons.HOME, ...adminButtons, navButtons.PROFILE, navButtons.SIGN_OUT(signoutUser)];
	const visitorNavButtons = [navButtons.HOME, navButtons.SIGN_IN];

	if (globalState.userId === "none") return (<div />);
	else {
		return (
			<Router>
				<div className="App">
					<ONavBar rightSide={globalState.isAuthed ? authedNavButtons : visitorNavButtons} selected="HOME" />
					<Route exact path="/" component={Home} />
					<Route exact path="/auth" component={Auth} />
					<AuthenticatedRoute exact path="/admin" component={Admin} isAuthenticated={globalState.isAdmin} />
					<AuthenticatedRoute exact path="/settings/:id" component={Settings} isAuthenticated={globalState.isAdmin} />
					<AuthenticatedRoute exact path="/profile/:id" component={Profile} isAuthenticated={globalState.isAdmin} />
					<AuthenticatedRoute exact path="/settings" component={Settings} isAuthenticated={globalState.isAuthed} />
					<AuthenticatedRoute exact path="/profile" component={Profile} isAuthenticated={globalState.isAuthed} />
					<ToastsContainer store={ToastsStore} />
				</div>
			</Router>
		);
	}
}

export default App;