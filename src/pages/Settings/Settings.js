import React, { Component } from 'react';
import { General, Accounts } from '../../components/Settings';
import '../../utils/styles/global.css';
import './Settings.css';

class Settings extends Component {

    render() {
        return (
            <div>
                <General />
                <Accounts />
            </div>
        );
    }

}

export default Settings