import React, { Component } from 'react'
import { ProfileTile } from '../index'
import "../../../utils/styles/global.css";
import "./SidePanel.css";

class SidePanel extends Component {
    render() {
        return (
            <div id="side-panel" >
                <h2 className="user-name"> mr moshe </h2>
                <ProfileTile name="zvi karp" avatar="pic"/>
            </div>
        )
    }
};
export default SidePanel;