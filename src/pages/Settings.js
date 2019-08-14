import React from "react";
import useGlobal from "../store";

import { General, Accounts } from '../components/Settings';




// TODO: get userid for history data here.

const Settings = (props) => {
	
	const [globalState,] = useGlobal();
	const userId = globalState.userId;
	if (userId) {
	return (
		<div>
			<General userId={userId} />
			<Accounts userId={userId} />
		</div>
	);
	} else {
		return <div />
	}
}

export default Settings