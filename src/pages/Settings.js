import React from 'react';

import { General } from '../components/Settings';

// TODO: get userid here.

const Settings = (props) => {

	return (
		<div>
			<General ofUser={props.location.data} />
			{/* <Accounts ofUser={props.location.data} /> */}
		</div>
	);
}

export default Settings