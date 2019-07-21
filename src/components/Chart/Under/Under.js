import React, { Component } from "react";
import { Tile } from "../index";
import "../../../utils/styles/global.css";
import "./Under.css";

class Under extends Component {
	
  renderTiles() {
    const tiles = this.props.under;
    if (tiles.length === 0) {
      return <div className="under-text under-loading">Loading...</div>;
    }
    var tilesObjects = [];
    for (var i = 0; i < tiles.length; i++) {
      tilesObjects.push(<Tile key={i} user={this.props.under[i]} />);
    }
    return tilesObjects;
  }

  render() {
    return (
      <div id="under">
        <div className="under-text">
          {" "}
          <span role="img" aria-label="banana">
            😔
          </span>{" "}
          Users that have less then 50 points{" "}
        </div>
        <div className="under-cards">{this.renderTiles()}</div>
      </div>
    );
  }
}

export default Under;
