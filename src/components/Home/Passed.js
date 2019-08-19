import React from "react";

import { OCard, OLoading } from "../core";
import { Tile } from "./index";

const Passed = (props) => {

	const renderTiles = () => {
		const tiles = props.passed;
		if (!props.loaded) {
			return <OLoading />;
		}
		else if (tiles.length === 0) {
			return <div>Humm... This section is currently empty</div>;
		}
		var tilesObjects = [];
		for (var i = 0; i < tiles.length; i++) {
			tilesObjects.push(<Tile key={i} user={props.passed[i]} isAdmin={props.isAdmin} />);
		}
		return tilesObjects;
	}

	const title = "🤙 Users that have more then 50 points";
	return (
		<OCard wide>
			<h2>{title}</h2>
			<div className="tiles-list">{renderTiles()}</div>
		</OCard>
	);
}

export default Passed;
