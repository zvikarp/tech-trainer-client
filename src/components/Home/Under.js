import React from "react";

import { Tile } from "./";

const Under = (props) => {

	const renderTiles = () => {
		const tiles = props.under;
		if (!props.loaded) {
			return <div className="under-text under-loading">Loading...</div>;
		} else if (tiles.length === 0) {
			return <div className="passed-text passed-loading">Humm... This section is currently empty</div>;
		}
		var tilesObjects = [];
		for (var i = 0; i < tiles.length; i++) {
			tilesObjects.push(<Tile key={i} user={props.under[i]} isAdmin={props.isAdmin} />);
		}
		return tilesObjects;
	}

	// TODO: can do better then this for the string, at least make it in a const
	return (
		<div id="under">
			<div className="under-text">
				{" "}
				<span role="img" aria-label="emoji">😔</span>
				{" "}
				Users that have less then 50 points
        </div>
			<div className="under-cards">{renderTiles()}</div>
		</div>
	);
}

export default Under;
