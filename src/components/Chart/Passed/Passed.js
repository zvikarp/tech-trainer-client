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
        var tilesObjects = [];
        for (var i = 0; i < tiles.length; i++) {
          tilesObjects.push(<Tile user={this.props.passed[i]} />);
        }
        return (tilesObjects);
  }

  render() {
    return (
      <div id="passed">
        <h2 className="passed-title"> Passed </h2>
        <div className="passed-cards">
          {this.renderTiles()}
        </div>
      </div>
    );
  }
}

export default Passed;
