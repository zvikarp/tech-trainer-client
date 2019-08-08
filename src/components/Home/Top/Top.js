import React from 'react';
import { withRouter } from "react-router-dom";

import "../../../utils/styles/global.css";
import "./Top.css";

const onAdminClick = (props) => {
	props.history.push({
		pathname: '/profile',
		data: { "userId": props.user.id }
	});
}

const IsLoading = () => {
	return (
		<div id="top" className="top-loading">Loading...</div>
	);
}

const DoesntHaveUser = () => {
	return (
		<div id="top" className="top-loading">Don't have a solid top 3 yet! <span role="img" aria-label="emoji">😱</span></div>
	);
}

const HasUser = (props) => {
	return (
		<div>
			<div className="top-child top-icon">
				<span role="img" aria-label="emoji">{props.icon}</span>
			</div>
			<div className="top-child">
				<h3> {props.user.name} </h3>
				<h3> {props.user.points} points</h3>
			</div>
		</div>
	);
}

const AdminWrap = (props) => {
	return (
		<div id="top" className="admin-top-button" onClick={() => onAdminClick(props)}>
			{HasUser(props)}
		</div>
	);
}

const Top = (props) => {
	const user = props.user ? props.isAdmin ? AdminWrap(props) : HasUser(props) : DoesntHaveUser();
	const content = props.loaded ? user : IsLoading();

	return content;
}

export default withRouter(Top);