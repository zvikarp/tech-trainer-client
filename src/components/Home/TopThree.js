import React from "react";

import { Top } from "./";

const TopThree = ({ top3, loaded, isAdmin }) => {

	return (
		<div id="top-three">
			<div className="top-three-cards">
				<Top user={top3[1]} loaded={loaded} isAdmin={isAdmin} icon="🥈" top="top2" />
				<Top user={top3[0]} loaded={loaded} isAdmin={isAdmin} icon="🥇" top="top1" />
				<Top user={top3[2]} loaded={loaded} isAdmin={isAdmin} icon="🥉" top="top3" />
			</div>
		</div>
	);
}

export default TopThree;
