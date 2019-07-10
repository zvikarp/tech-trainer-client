import React, { Component } from 'react'
import { Signup, Signin } from '../../components/Welcome/index.js'
import "../../utils/styles/global.css";
import "./Welcome.css";

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signup: true,
        };
    }

    chagneForm() {
        this.setState({signup: !this.state.signup});
    }

    renderForm() {
        if (this.state.signup) {
            return (
                <div>
                    <Signup />
                    <div className="link-to-signin">already a user? <span className="link" onClick={() => this.chagneForm()}>sign in here</span>.</div>
                </div>
            );
            } else {
                return (
                    <div>
                        <Signin />
                        <div className="link-to-signin">new to orange chat? <span className="link" onClick={() => this.chagneForm()}>sign up here</span>.</div>
                    </div>
                );
            }
        }
        
        render() {
            return (
                <div id="welcome">
                <h1 className="welcome-message">welcome to orange chat  <span role="img" aria-label="banana">🧡📪</span></h1>
                {this.renderForm()}
            </div>
        )
    }
};
export default Welcome;