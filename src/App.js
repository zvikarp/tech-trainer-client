import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import JwtDecode from "jwt-decode";

import useGlobal from "./store";
import { Auth, Home, Settings, Admin, Profile } from './pages/index.js';
import SetAuthToken from "./utils/auth/setAuthToken";
import store from './redux/store';
import "./utils/styles/global.css";

const App = () => {

	useEffect(() => {
		signinUser();
	});

	const [ , globalActions] = useGlobal();

	const signinUser = () => {
		if (localStorage.jwtToken) {
			const token = localStorage.jwtToken;
			SetAuthToken(token);
			const user = JwtDecode(token);
			globalActions.updateUser(user);
			const currentTime = Date.now() / 1000;
			if (user.exp < currentTime) {
				globalActions.signoutUser();
			}
		}
	}

	return (
		<Provider store={store}>
			<Router>
				<div className="App">
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