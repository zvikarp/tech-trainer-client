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
        <h2 className="top-three-title"> Top three </h2>
        <div className="top-three-cards">
          <Top user={this.props.top3[0]} />
          <Top user={this.props.top3[1]} />
          <Top user={this.props.top3[2]} />
        </div>
      </div>
    );
  }
}

export default TopThree;
