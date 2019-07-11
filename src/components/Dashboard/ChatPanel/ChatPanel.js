import React, { Component } from 'react';
import { ComposeMessage, ChatHeader } from '../index';
import '../../../utils/styles/global.css'
import './ChatPanel.css';

class ChatPanel extends Component {

    render() {
        return (
            <div id="chat-panel">
                <ChatHeader />
                <ComposeMessage />
            </div>
        );
    }
}

export default ChatPanel;