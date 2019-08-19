import React from 'react';
import { withRouter } from "react-router-dom";

import { OLoading } from '../core';

const Top = (props) => {

	const onAdminClick = (props) => {
		props.history.push('/profile/' + props.user.id);
	}

	const hasUser = (props) => {
		if (props.isAdmin) {
			return (
				<div className={"top admin " + props.top} onClick={() => onAdminClick(props)}>
					{topUser(props)}
				</div>
			);
		} else {
			return (
				<div className={"top " + props.top}>
					{topUser(props)}
				</div>
			);
		}
	}

	const topUser = (props) => {
		return (
			<div>
				<div className="top-icon">
					<span role="img" aria-label="emoji">{props.icon}</span>
				</div>
				<div className="top-child">
					<h3> {props.user.name} </h3>
					<h3> {props.user.points} points</h3>
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