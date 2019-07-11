import React, { Component } from 'react'
import { ProfilesList, UserProfile, SearchBar} from '../index'
import "../../../utils/styles/global.css";
import "./SidePanel.css";

class SidePanel extends Component {
    render() {
        return (
            <div id="side-panel" >
                <UserProfile />
                <SearchBar />
                <ProfilesList />
            </div>
        )
    }
};
export default SidePanel;