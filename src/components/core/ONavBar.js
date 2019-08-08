import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import { OLink } from "../core";

const ONavBar = props => {
	const firstSelected = props.history.location.pathname;
	const [selected, setSelected] = useState(firstSelected);
	const rightSide = props.rightSide || [];
	const leftSide = props.leftSide || [];
	const renderLink = link => (
		<OLink
			{...link}
			selected={link.route === selected}
		/>
	);
	const updateSelected = () => {setSelected(firstSelected)};

	useEffect(() => {
		updateSelected();
		// eslint-disable-next-line
	}, [firstSelected]);

	return (
		<div className="onavbar">
			<div>{leftSide.map(link => renderLink(link))}</div>
			<div>{rightSide.map(link => renderLink(link))}</div>
		</div>
	);
};

export default withRouter(ONavBar);
