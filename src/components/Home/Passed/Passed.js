import React, { Component } from "react";

import { Tile } from "../index";

import "../../../utils/styles/global.css";
import "./Passed.css";

class Passed extends Component {

	renderTiles() {
		const tiles = this.props.passed;
		if (!this.props.loaded) {
			return <div className="passed-text passed-loading">Loading...</div>;
		}
		else if (tiles.length === 0) {
			return <div className="passed-text passed-loading">Humm... This section is currently empty</div>;
		}
		var tilesObjects = [];
		for (var i = 0; i < tiles.length; i++) {
			tilesObjects.push(<Tile key={i} user={this.props.passed[i]} isAdmin={this.props.admin} />);
		}
		return tilesObjects;
	}

	render() {
		return (
			<div id="passed">
				<div className="passed-text">
					{" "}
					<span role="img" aria-label="emoji">🤙</span>
					{" "}
					Users that have more then 50 points
        </div>
				<div className="passed-cards">{this.renderTiles()}</div>
			</div>
		);
	}
}

export default Passed;
