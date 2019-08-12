import React from 'react';
import { withRouter } from "react-router-dom";

const Tile = (props) => {

	const onAdminClick = () => {
		props.history.push({
			pathname: '/profile',
			data: { "userId": props.user.id },
		});
	}

	const renderTile = () => {
		return (
			<div id="tile">
				<h3 className="tile-points"> {props.user.points} </h3>
				<h3 className="tile-username"> {props.user.name} </h3>
			</div>
		);
	}

	if (props.admin) {
		return (
			<div className="admin-tile-button" onClick={() => onAdminClick()}>
				{renderTile()}
			</div>
		);
	}
	else if (props.user) {
		return (renderTile());
	} else {
		return (
			<div id="tile">Loading...</div>
		);
	}
}


export default withRouter(Tile);