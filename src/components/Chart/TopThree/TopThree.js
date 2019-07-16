import React, { Component } from "react";
import { Top } from "../index";
import "../../../utils/styles/global.css";
import "./TopThree.css";

class TopThree extends Component {
  render() {
    return (
      <div id="top-three">
        <h2 className="top-three-title"> Top three </h2>
        <div class="top-three-cards">
          <Top />
          <Top />
          <Top />
        </div>
      </div>
    );
  }
}

export default TopThree;
