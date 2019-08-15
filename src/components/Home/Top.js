import React from 'react';
import { withRouter } from "react-router-dom";
import { OLoading } from '../core';

// TODO: 1. I can do better then this, 2. I dont think this is how it is supposed to be...


const Top = (props) => {
	const onAdminClick = (props) => {
		props.history.push({
			pathname: '/profile',
			data: { "userId": props.user.id }
		});
	}

	const IsLoading = () => {
		return (
			<div id="top"><OLoading /></div>
		);
	}

	const DoesntHaveUser = () => {
		return (
			<div id="top">Don't have a solid top 3 yet! <span role="img" aria-label="emoji">😱</span></div>
		);
	}

	const HasUser = (props) => {
		if (props.isAdmin) {
			return (
				<div id="top" className="admin-top-button" onClick={() => onAdminClick(props)}>
					{TopUser(props)}
				</div>
			);
		} else {
			return (
				<div id="top">
					{TopUser(props)}
				</div>
			);
		}
	}

	const TopUser = (props) => {
		return (
			<div className={props.top}>
				<div className="top-icon">
					<span role="img" aria-label="emoji">{props.icon}</span>
				</div>
				<div className="top-child">
					<div><h3> {props.user.name} </h3>
					<h3> {props.user.points} points</h3></div>
				</div>
			</div>
		);
	}
	const user = props.user ? HasUser(props) : DoesntHaveUser();
	const content = props.loaded ? user : IsLoading();

	return content;
}

export default withRouter(Top);