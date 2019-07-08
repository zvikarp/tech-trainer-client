import React, { Component } from 'react'
import { Signup } from '../../components/Welcome/index.js'
import "../../utils/styles/global.css";
import "./Welcome.css";

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state({
            signup: true,
        });
    }

    renderForm() {
        if (this.state.signup) {
            return (
                <Signup />
                <div class="link-to-signin">already a user? <a href="/">sign in here</a>.</div>
            );
        }
    }

    render() {
        return (
            <div id="welcome">
                <h1 class="welcome-message">welcome to orange chat  <span role="img" aria-label="banana">🧡📪</span></h1>
                
            </div>
        )
    }
};
export default Welcome;