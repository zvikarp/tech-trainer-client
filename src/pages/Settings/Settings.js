import React, { Component } from 'react';
import { General, Accounts } from '../../components/Settings';
import '../../utils/styles/global.css';
import './Settings.css';

class Settings extends Component {

	render() {
		return (
			<div>
				<button className="primary back-button" onClick={() => this.props.history.push("/")}>
					<i className="fas fa-chevron-left" />
					<div className="button-text">BACK</div>
				</button>
				<General/>
				<Accounts />
			</div>
		);
	}

}

export default Settings