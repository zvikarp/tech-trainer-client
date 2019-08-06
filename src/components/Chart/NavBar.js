import React from 'react';

import { OButton } from '../core'

export default function NavBar(props) {
	return (
		<div className="chart-top-bar-right">
			{this.renderAdminButton()}
			<OButton
				text="SETTINGS"
				icon="fas fa-cogs"
				onClick={() => this.props.history.push("/settings")}
			/>
			<OButton
				text="PROFILE"
				icon="fas fa-user"
				onClick={() => this.props.history.push("/profile")}
			/>
			<OButton
				secondary
				text="SIGN OUT"
				onClick={() => this.signout()}
			/>
		</div>
	);
}