import React, { Component } from "react";
import { Top } from "../index";
import "../../../utils/styles/global.css";
import "./TopThree.css";

class TopThree extends Component {

  constructor(props) {
    super(props);
    console.log("in top three");
  }

  render() {
    return (
      <div id="top-three">
        <div className="top-three-title"><span role="img" aria-label="banana">🏆</span> Top three </div>
        <div className="top-three-cards">
          <Top user={this.props.top3[0]} icon="🥇" />
          <Top user={this.props.top3[1]} icon="🥈"/>
          <Top user={this.props.top3[2]} icon="🥉"/>
        </div>
      </div>
    );
  }
}

export default TopThree;
