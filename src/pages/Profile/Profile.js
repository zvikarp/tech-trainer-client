import React, { Component } from "react";
import { User, History } from '../../components/Profile';


class Profile extends Component {

	render() {
		return (
			<div>
				<i className="fas fa-chevron-left icon-button back-button" onClick={() => this.props.history.push('/')}></i>
				<User />
				<History />
			</div>
		);
	}


}

export default Profile