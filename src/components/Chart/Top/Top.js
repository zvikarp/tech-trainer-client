import React, { Component } from 'react';
import "../../../utils/styles/global.css";
import "./Top.css";

class Top extends Component {
  render() {
    if (this.props.user) {
      return (
        <div id="top">
          <h3 className="top-username"> {this.props.user.name} </h3>
          <h3 className="top-username"> {this.props.user.points} </h3>
        </div>
      );
    } else {
      return (
        <div id="top">none</div>
      );
    }
  }
}

export default Top;