import React, { Component } from 'react';
import store from "../../../redux/store";
import "../../../utils/styles/global.css";
import "./User.css";

class User extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: store.getState().auth.user,
		};
	}

	render() {
			return (
				<div id="user">
					<h3 className="user-points"> {this.state.user.name} </h3>
				</div>
			);
	}
}

export default User;