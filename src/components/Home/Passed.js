import React from "react";

import { Tile } from "./index";

const Passed = (props) => {

	const renderTiles = () => {
		const tiles = props.passed;
		if (!props.loaded) {
			return <div className="passed-text passed-loading">Loading...</div>;
		}
		else if (tiles.length === 0) {
			return <div className="passed-text passed-loading">Humm... This section is currently empty</div>;
		}
		var tilesObjects = [];
		for (var i = 0; i < tiles.length; i++) {
			tilesObjects.push(<Tile key={i} user={props.passed[i]} isAdmin={props.admin} />);
		}
		return tilesObjects;
	}

	// TODO: can do better then this for the string, at least make it in a const
	return (
		<div id="passed"> 
			<div className="passed-text">
				{" "}
				<span role="img" aria-label="emoji">🤙</span>
				{" "}
				Users that have more then 50 points
        </div>
			<div className="passed-cards">{renderTiles()}</div>
		</div>
	);
}

export default Passed;
