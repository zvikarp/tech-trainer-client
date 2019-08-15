import React from "react";

import { OCard, OLoading } from "../core";
import { Tile } from "./";

const Under = (props) => {

	const renderTiles = () => {
		const tiles = props.under;
		if (!props.loaded) {
			return <OLoading />;
		} else if (tiles.length === 0) {
			return <div>Humm... This section is currently empty</div>;
		}
		var tilesObjects = [];
		for (var i = 0; i < tiles.length; i++) {
			tilesObjects.push(<Tile key={i} user={props.under[i]} isAdmin={props.isAdmin} />);
		}
		return tilesObjects;
	}

	// TODO: can do better then this for the string, at least make it in a const
	return (
		<OCard wide>
			<h2>
				{" "}
				<span role="img" aria-label="emoji">😔</span>
				{" "}
				Users that have less then 50 points
        </h2>
			<div className="tiles-list">{renderTiles()}</div>
		</OCard>
	);
}

export default Under;
