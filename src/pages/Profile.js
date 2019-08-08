import React, { useEffect, useState } from "react";
import { ToastsStore } from 'react-toasts';

import messages from "../consts/messages";
import useGlobal from "../store";
import { User, History } from '../components/Profile';
import { OButton } from '../components/core';
import { getAccounts } from "../sheard/apis/accounts";
import { getHistory } from "../sheard/apis/history";
import { getUser } from "../sheard/apis/user";


const Profile = (props) => {

	const [history, setHistory] = useState({});
	const [globalState,] = useGlobal();
	const userId = globalState.userId;
	
	const [accounts, setAccounts] = useState({});
	const [user, setUser] = useState({ id: userId });

	useEffect(() => {
		loadAccounts();
		loadUser();
		loadHistory();
		// eslint-disable-next-line
	}, []);


	// constructor(props) {
	// 	super(props);
	// 	const data = this.props.location.data;
	// 	var userId;
	// 	if (data) {
	// 		userId = data.userId;
	// 	} else {
	// 		userId = store.getState().auth.user.id
	// 	}
	// 	console.log(userId);
	// 	this.state = {
	// 		token: localStorage.jwtToken,
	// 		user: {},
	// 		history: {},
	// 		accounts: {},
	// 		userId: userId
	// 	};

	// }

	// componentDidMount() {
	// 	this.loadAccounts();
	// 	this.loadUser();
	// 	this.loadHistory();
	// }

	const loadAccounts = async () => {
		try {
			const accounts = await getAccounts(user.id);
			setAccounts(accounts);
		} catch (err) {
			ToastsStore.info(messages.ERROR_LOADING_DATA);
		}
	}

	const loadUser = async () => {
		console.log(userId);

		try {
			const loadedUser = await getUser(user.id);
			setUser(loadedUser);
		} catch (err) {
			ToastsStore.info(messages.ERROR_LOADING_DATA);
		}
	}

	const loadHistory = async () => {
		try {
			const historyRes = await getHistory(user.id);
			var accounts = {};
			var dates = [];
			Object.values(historyRes).forEach(doc => {
				dates.push(doc.timestamp);
				if (!accounts['all points']) accounts['all points'] = [];
				accounts['all points'].push(doc.points);
				if (!doc.accounts) return;
				Object.keys(doc.accounts).forEach(account => {
					if (!accounts[account]) accounts[account] = [];
					accounts[account].push(doc.accounts[account]);
				});
			});
			var series = [];
			const categories = dates
			Object.keys(accounts).forEach(account => {
				series.push({
					name: account,
					data: accounts[account],
				});
			});
			const history = {
				series: series,
				categories: categories,
			}
			setHistory(history);
		} catch (err) {
			ToastsStore.info(messages.ERROR_LOADING_DATA);
		}
	}

	// const renderSettingsButton = () => {
	// 	if (globalState.userId) {
	// 		return (
	// 			<OButton
	// 				customStyle="settings-button"
	// 				text="SETTINGS"
	// 				icon="fas fa-cogs"
	// 				onClick={() => this.props.history.push({
	// 					pathname: '/settings',
	// 					data: { "userId": globalState.userId },
	// 				})}
	// 			/>
	// 		);
	// 	} else {
	// 		return (<div />);
	// 	}
	// }

	const renderLoading = () => {
		return (<div className="profile-loading">Loading...</div>);
	}

	const renderUser = () => {
		if ((user.name) && (Object.keys(accounts).length > 0)) {
			return (<User user={user} accounts={accounts} />);
		} else {
			return (renderLoading());
		}
	}

	const renderHistory = () => {
		if (history.categories) {
			return (<History history={history} />);
		} else {
			return (renderLoading());
		}
	}

	return (
		<div>
			{userId}
			{renderUser()}
			{renderHistory()}
		</div>
	);

}

export default Profile;