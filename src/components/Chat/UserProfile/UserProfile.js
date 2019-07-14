import React, { Component } from 'react';
import '../../../utils/styles/global.css'
import './UserProfile.css'

class UserProfile extends Component {
    render() {        
        return (
            <div id="user-profile">
                <i className="fas fa-sign-out-alt signount-button"></i>
                <div className="avatar">
                    <img src={process.env.PUBLIC_URL + '/assets/avatars/avatar1.jpg'} alt="avatar" />
                </div>
                <div className="user-name">
                    <h3>Zvi Karp</h3>
                </div>
            </div>
        );
    }
}

export default UserProfile;