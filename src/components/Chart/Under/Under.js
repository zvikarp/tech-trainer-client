import React, { Component } from "react";
import { Tile } from "../index";
import "../../../utils/styles/global.css";
import "./Under.css";

class Under extends Component {

  constructor(props) {
    super(props);
    console.log("in under");
  }


  renderTiles() {
    const tiles = this.props.under;
        var tilesObjects = [];
        for (var i = 0; i < tiles.length; i++) {
          tilesObjects.push(<Tile user={this.props.under[i]} />);
        }
        return (tilesObjects);
  }

  render() {
    return (
      <div id="under">
        <h2 className="under-title"> Users that have less then 50 points </h2>
        <div className="under-cards">
          {this.renderTiles()}
        </div>
      </div>
    );
  }
}

export default Under;
