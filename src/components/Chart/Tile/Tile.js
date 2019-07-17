import React, { Component } from 'react';
import "../../../utils/styles/global.css";
import "./Tile.css";

class Tile extends Component {
  render() {
    if (this.props.user) {
      return (
        <div id="tile">
          <h3 className="tile-points"> {this.props.user.points} </h3>
          <h3 className="tile-username"> {this.props.user.name} </h3>
        </div>
      );
    } else {
      return (
        <div id="tile">none</div>
      );
    }
  }
}

export default Tile;