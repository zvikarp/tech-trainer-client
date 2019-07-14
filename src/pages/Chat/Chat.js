import React, { Component } from 'react'
import { SidePanel, ChatPanel} from '../../components/Chat/index.js'
import "../../utils/styles/global.css";
import "./Chat.css";

class Chat extends Component {

    render() {
        return (
            <div>
                <SidePanel />
                <ChatPanel />
            </div>
        )
    }
};
export default Chat;