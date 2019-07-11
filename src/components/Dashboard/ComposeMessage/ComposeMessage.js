import React, { Component } from 'react'
import "../../../utils/styles/global.css";
import "./ComposeMessage.css";

class ComposeMessage extends Component {
    render() {
        return (
            <div id="compose-message" >
                <input className="message-input" />
                <button className="secondary" >SEND</button>
            </div>
        )
    }
};
export default ComposeMessage;