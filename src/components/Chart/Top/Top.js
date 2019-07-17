import React, { Component } from 'react';
import "../../../utils/styles/global.css";
import "./Top.css";

class Top extends Component {
  render() {
    if (this.props.user) {
      return (
        <div id="top">
          <div className="top-child top-icon">
          <span role="img" aria-label="banana">{this.props.icon}</span>
          </div>
          <div className="top-child">
            <h3> {this.props.user.name} </h3>
            <h3> {this.props.user.points} points</h3>
          </div>
        </div>
      );
    } else {
      return (
        <div id="top" className="top-loading">Loading...</div>
      );
    }
  }
}

export default Top;