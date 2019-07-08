import React, { Component } from 'react'
import { Signup } from '../../components/Welcome/index.js'
import "../../utils/styles/global.css";
import "./Welcome.css";

class Welcome extends Component {
    render() {
        return (
            <div id="welcome">
                <h1 class="welcome-message">welcome to orange chat  <span role="img" aria-label="banana">🧡📪</span></h1>
                <Signup />
                <div class="link-to-signin">already a user? <a href="/">sign in here</a>.</div>
            </div>
        )
    }
};
export default Welcome;