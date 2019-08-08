import React from "react";

import { Top } from "../";

import "../../../utils/styles/global.css";
import "./TopThree.css";

const TopThree = (props) => {

	return (
		<div id="top-three">
			<div className="top-three-title"><span role="img" aria-label="emoji">🏆</span> Top three </div>
			<div className="top-three-cards">
				<Top user={props.top3[0]} loaded={props.loaded} isAdmin={props.isAdmin} icon="🥇" />
				<Top user={props.top3[1]} loaded={props.loaded} isAdmin={props.isAdmin} icon="🥈" />
				<Top user={props.top3[2]} loaded={props.loaded} isAdmin={props.isAdmin} icon="🥉" />
			</div>
		</div>
	);
}

export default TopThree;
