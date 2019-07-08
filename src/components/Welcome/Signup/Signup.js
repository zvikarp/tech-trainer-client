import React, { Component } from 'react'
import "../../../utils/styles/global.css";
import "./Signup.css";

class Signup extends Component {
    render() {
        return (
            <div id="signup" >
                <h2 class="signup-title"> Sign Up </h2>
                <div class="labeld-input">
                    <label>Full Name:</label>
                    <input/>
                </div>
                <div class="labeld-input">
                    <label>Nickname:</label>
                    <input/>
                </div>
                <div class="labeld-input">
                    <label>Password:</label>
                    <input/>
                </div>
                <div class="action-section">
                    <button class="primary signup-button" onClick={() => { }}>SIGN UP</button>
                </div>
            </div>
        )
    }
};
export default Signup;