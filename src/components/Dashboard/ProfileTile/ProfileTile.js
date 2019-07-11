import React, { Component } from 'react';
import '../../../utils/styles/global.css'
import './ProfileTile.css';

class ProfileTile extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         name: this.props.name,
    //         avatar: this.props.avatar,
    //     }
    // }

    render() {
        return (
            <div id="tile">
                <div className="divider horizontal"></div>
                <div id="profile-tile">
                    <div className="avatar-small">
                        <img src={this.props.avatar} alt="avatar" />
                    </div>
                    <div className="content">
                        <div className="name">{this.props.name}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileTile;