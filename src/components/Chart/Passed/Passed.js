import React, { Component } from "react";
import { Tile } from "../index";
import "../../../utils/styles/global.css";
import "./Passed.css";

class Passed extends Component {
  constructor(props) {
    super(props);
    console.log("in passed");
  }

  renderTiles() {
    const tiles = this.props.passed;
    if (tiles.length === 0) {
      return <div className="passed-text passed-loading">Loading...</div>;
    }
    var tilesObjects = [];
    for (var i = 0; i < tiles.length; i++) {
      tilesObjects.push(<Tile key={i} user={this.props.passed[i]} />);
    }
    return tilesObjects;
  }

  render() {
    return (
      <div id="passed">
        <div className="passed-text">
          {" "}
          <span role="img" aria-label="banana">
            🤙
          </span>{" "}
          Users that have more then 50 points{" "}
        </div>
        <div className="passed-cards">{this.renderTiles()}</div>
      </div>
    );
  }
}

export default Passed;