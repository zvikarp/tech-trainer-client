import React, { Component } from 'react'
import { SidePanel } from '../../components/Dashboard/index.js'
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
            </div>
        )
    }
};
export default Dashboard;