import React, { Component } from 'react';

import { General, Accounts } from '../../components/Settings';
import { OButton } from '../../components/core';

import '../../utils/styles/global.css';
import './Settings.css';

class Settings extends Component {

	render() {
		return (
			<div>
				<OButton
					type="primary back-button"
					onClick={() => this.props.history.push("/")}
					icon="fas fa-chevron-left"
					text="BACK"
				/>
				<General ofUser={this.props.location.data}/>
				<Accounts ofUser={this.props.location.data} />
			</div>
		);
	}

}

export default Settings