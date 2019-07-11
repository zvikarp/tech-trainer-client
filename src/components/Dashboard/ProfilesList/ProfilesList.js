import React, { Component } from 'react';
import { ProfileTile } from '../index';
import '../../../utils/styles/global.css';
import './ProfilesList.css';

class ProfilesList extends Component {
    render() {
        return(
            <div id="profiles-list">
                <ProfileTile name="user one" avatar={process.env.PUBLIC_URL + '/assets/avatars/avatar2.jpg'}/>
                <ProfileTile name="someone else" avatar={process.env.PUBLIC_URL + '/assets/avatars/avatar3.jpg'}/>
                <ProfileTile name="another poerson" avatar={process.env.PUBLIC_URL + '/assets/avatars/avatar4.jpg'}/>
                <ProfileTile name="last one" avatar={process.env.PUBLIC_URL + '/assets/avatars/avatar5.jpg'}/>
                <ProfileTile name="user one" avatar={process.env.PUBLIC_URL + '/assets/avatars/avatar2.jpg'}/>
                <ProfileTile name="someone else" avatar={process.env.PUBLIC_URL + '/assets/avatars/avatar3.jpg'}/>
                <ProfileTile name="another poerson" avatar={process.env.PUBLIC_URL + '/assets/avatars/avatar4.jpg'}/>
                <ProfileTile name="last one" avatar={process.env.PUBLIC_URL + '/assets/avatars/avatar5.jpg'}/>
            </div>
        );
    }
}

export default ProfilesList;