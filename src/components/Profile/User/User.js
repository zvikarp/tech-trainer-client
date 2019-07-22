import React, { Component } from 'react';
import store from "../../../redux/store";
import "../../../utils/styles/global.css";
import "./User.css";

class User extends Component {

	render() {
			return (
				<div id="user">
					<h3 className="user-points"> {this.props.user.name} </h3>
				</div>
			);
	}
}

export default User;