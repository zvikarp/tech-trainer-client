import React, { Component } from 'react';
import { General, Accounts } from '../../components/Settings';
import '../../utils/styles/global.css';
import './Settings.css';
import store from "../../redux/store";

class Settings extends Component {

	render() {
		return (
			<div>
				<i className="fas fa-chevron-left icon-button back-button" onClick={() => this.props.history.push('/')}></i>
				<General name={store.getState().auth.user.name} email={store.getState().auth.user.email} points={store.getState().auth.user.points} />
				<Accounts />
			</div>
		);
	}

}

export default Settings