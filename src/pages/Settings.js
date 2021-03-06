import React from "react";

import useGlobal from "../globalHook/store";
import { General, Accounts } from '../components/Settings';

const Settings = (props) => {

	const [globalState,] = useGlobal();
	const userId = props.match.params.id ? props.match.params.id : globalState.userId;
	const isAdmin = props.match.params.id && true;
	if (userId) {
		return (
			<div>
				<General userId={userId} isAdmin={isAdmin} />
				<Accounts userId={userId} />
			</div>
		);
	} else {
		return <div />
	}
}

export default Settings