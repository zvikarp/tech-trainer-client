import React from "react";

import { OLink } from "../core";

export default function ONavBar(props) {

	const rightSide = props.rightSide || [];
	const leftSide = props.leftSide || [];

	return (
		<div id="nav-bar">
			<div>
				{leftSide.map(link => {
					return (<OLink {...link} />)
				})}
			</div>
			<div>
				{rightSide.map(link => {
					return (<OLink {...link} />)
				})}
			</div>
		</div>
	);
}
