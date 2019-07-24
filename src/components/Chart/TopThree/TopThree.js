import React, { Component } from "react";
import { Top } from "../index";
import "../../../utils/styles/global.css";
import "./TopThree.css";

class TopThree extends Component {

  render() {
    return (
      <div id="top-three">
        <div className="top-three-title"><span role="img" aria-label="emoji">🏆</span> Top three </div>
        <div className="top-three-cards">
          <Top user={this.props.top3[0]} loaded={this.props.loaded} admin={this.props.admin} icon="🥇" />
          <Top user={this.props.top3[1]} loaded={this.props.loaded} admin={this.props.admin} icon="🥈"/>
          <Top user={this.props.top3[2]} loaded={this.props.loaded} admin={this.props.admin} icon="🥉"/>
        </div>
      </div>
    );
  }
}

export default TopThree;
