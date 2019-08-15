import React from "react";

import { Top } from "./";

const TopThree = (props) => {

	return (
		<div id="top-three">
			<div className="top-three-cards">
				<Top user={props.top3[1]} loaded={props.loaded} isAdmin={props.isAdmin} icon="🥈" top="top2" />
				<Top user={props.top3[0]} loaded={props.loaded} isAdmin={props.isAdmin} icon="🥇" top="top1" />
				<Top user={props.top3[2]} loaded={props.loaded} isAdmin={props.isAdmin} icon="🥉" top="top3" />
			</div>
		</div>
	);
}

export default TopThree;
