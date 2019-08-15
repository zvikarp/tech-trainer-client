import React from 'react';
import { withRouter } from "react-router-dom";
import { OLoading } from '../core';

const Top = (props) => {

	const onAdminClick = (props) => {
		props.history.push({
			pathname: '/profile',
			data: { "userId": props.user.id }
		});
	}

	const hasUser = (props) => {
		if (props.isAdmin) {
			return (
				<div id="top" className="admin-button" onClick={() => onAdminClick(props)}>
					{topUser(props)}
				</div>
			);
		} else {
			return (
				<div id="top">
					{topUser(props)}
				</div>
			);
		}
	}

	const topUser = (props) => {
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

	const isLoading = () => <div id="top"><OLoading /></div>;
	const doesntHaveUserText = "Don't have a solid top 3 yet! 😱";
	const doesntHaveUser = () => <div id="top">{doesntHaveUserText}</div>;
	const user = props.user ? hasUser(props) : doesntHaveUser();
	const content = props.loaded ? user : isLoading();

	return content;
}

export default withRouter(Top);