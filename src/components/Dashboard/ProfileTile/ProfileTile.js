import React, { Component } from 'react';
import '../../../utils/styles/global.css'

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
            <div>
                <div className="avatar">{this.props.avatar}</div>
                <div className="name">{this.props.name}</div>
            </div>
        );
    }
}

export default ProfileTile;