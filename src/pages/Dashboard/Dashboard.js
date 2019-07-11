import React, { Component } from 'react'
import { SidePanel, ChatPanel} from '../../components/Dashboard/index.js'
import "../../utils/styles/global.css";
import "./Dashboard.css";

class Dashboard extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div>
                <SidePanel />
                <ChatPanel />
            </div>
        )
    }
};
export default Dashboard;