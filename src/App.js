import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import JwtDecode from "jwt-decode";

import useGloble from "./store";
import { Auth, Home, Settings, Admin, Profile } from './pages/index.js';
import SetAuthToken from "./utils/auth/setAuthToken";
import store from './redux/store';
import { ONavBar } from "./components/core";
import navButtons from "./consts/navButtons";
import "./utils/styles/global.css";

// this needs to run BEFORE we render the app
if (localStorage.jwtToken) {
	const token = localStorage.jwtToken;
	SetAuthToken(token);
}

const App = () => {

	const [globalState, globalAction] = useGloble({
		userId: undefined,
		userName: undefined,
		isAdmin: undefined,
		isAuthed: false,
	});

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
		}
	}

	const signoutUser = () => {
		localStorage.removeItem("jwtToken");
		SetAuthToken(false);
		globalAction.signoutUser();
	};

	const adminButtons = globalState.isAdmin ? [navButtons.ADMIN] : [];
	const authedNavButtons = [navButtons.HOME, ...adminButtons, navButtons.SETTINGS, navButtons.PROFILE, navButtons.SIGN_OUT(signoutUser)];
	const visitorNavButtons = [navButtons.HOME, navButtons.SIGN_IN];

	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<ONavBar rightSide={globalState.isAuthed ? authedNavButtons : visitorNavButtons} selected="HOME" />
					<Route exact path="/" component={Home} />
					<Route exact path="/auth" component={Auth} />
					<Route exact path="/settings" component={Settings} />
					<Route exact path="/admin" component={Admin} />
					<Route exact path="/profile" component={Profile} />
				</div>
			</Router>
			<ToastsContainer store={ToastsStore} />
		</Provider>
	);
}

export default App;