import React, { useEffect, useState } from "react";
import { ToastsStore } from 'react-toasts';

import messages from "../consts/messages";
import useGlobal from "../globalHook/store";
import { User, History } from '../components/Profile';
import { getAccounts } from "../sheard/apis/accounts";
import { getHistory } from "../sheard/apis/history";
import { getUser } from "../sheard/apis/user";
import { resMessageParser } from "../utils/resParser";
import { OCard, OLoading } from "../components/core";

const Profile = (props) => {

	const [history, setHistory] = useState({});
	const [globalState,] = useGlobal();
	const userId = props.match.params.id ? props.match.params.id : globalState.userId;
	const [accounts, setAccounts] = useState({});
	const [user, setUser] = useState({ id: userId });
	const isAdmin = props.match.params.id && true;

	useEffect(() => {
		loadData();
		// eslint-disable-next-line
	}, [userId]);

	const loadData = () => {
		if (userId) {
			loadAccounts();
			loadUser();
			loadHistory();
		}
	}

	const loadAccounts = async () => {
		try {
			const accounts = await getAccounts(userId);		
			setAccounts(accounts);
		} catch (err) {
			ToastsStore.info(resMessageParser(err, messages.ERROR_LOADING_DATA));
		}
	}

	const loadUser = async () => {
		try {
			const loadedUser = await getUser(userId);
			setUser(loadedUser);
		} catch (err) {
			ToastsStore.info(resMessageParser(err, messages.ERROR_LOADING_DATA));
		}
	}

	const loadHistory = async () => {
		try {
			const historyRes = await getHistory(userId);
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
			ToastsStore.info(resMessageParser(err, messages.ERROR_LOADING_DATA));
		}
	}

	const renderLoading = () => {
		return (<OCard wide><OLoading /></OCard>);
	}

	const renderUser = () => {
		if ((user.name) && (Object.keys(accounts).length > 0) ) {
			return (<User user={user} accounts={accounts} isAdmin={isAdmin} />);
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
			{renderUser()}
			{renderHistory()}
		</div>
	);

}

export default Profile;